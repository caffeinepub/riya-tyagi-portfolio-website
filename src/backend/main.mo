import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Array "mo:core/Array";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";


import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";


actor {
  // Record type for contact messages
  type ContactMessage = {
    name : Text;
    email : Text;
    message : Text;
    timestamp : Time.Time;
  };

  type UpgradeInfo = {
    admin : ?Principal;
  };

  // User profile type
  public type UserProfile = {
    name : Text;
  };

  // Persistent storage for upgrade info (admin principal)
  var upgradeInfo : UpgradeInfo = {
    admin = null;
  };

  // Persistent empty map of messages
  var messages = Map.empty<Nat, ContactMessage>();
  var nextId = 0;

  // User profiles storage
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Constants and admin tracking
  let adminToken = "8a442e85f53e8e31bbe8c4e92525bba9794a6ce56e6ac84cff49e009c5f8b2ac";
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Restore admin role from stable storage after upgrade
  switch (upgradeInfo.admin) {
    case (?adminPrincipal) {
      // Re-assign admin role to the persisted admin principal
      AccessControl.initialize(accessControlState, adminPrincipal, adminToken, adminToken);
      AccessControl.assignRole(accessControlState, adminPrincipal, adminPrincipal, #admin);
    };
    case null {
      // No admin has been provisioned yet
    };
  };

  // Anyone (including guests) can create messages
  public shared ({ caller }) func submitMessage(name : Text, email : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      message;
      timestamp = Time.now();
    };

    messages.add(nextId, newMessage);
    nextId += 1;
  };

  // Admin-only method to retrieve all messages
  public query ({ caller }) func getAllMessages() : async [ContactMessage] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can access messages");
    };

    messages.values().toArray();
  };

  // Function to authorize admin via token (initializes first admin)
  public shared ({ caller }) func authorizeAdmin(userProvidedToken : Text) : async Bool {
    // Properly initialize access control with required tokens
    AccessControl.initialize(accessControlState, caller, adminToken, userProvidedToken);
    AccessControl.assignRole(accessControlState, caller, caller, #admin);

    // Persist admin principal to stable storage for upgrades
    upgradeInfo := {
      admin = ?caller;
    };

    true;
  };

  // Public function to check admin status
  public query ({ caller }) func checkAdminStatus() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // User profile management functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };
};
