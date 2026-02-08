# Specification

## Summary
**Goal:** Fix the “invalid PDF” issue by replacing the existing resume PDF with the newly user-attached PDF while keeping the same public URL.

**Planned changes:**
- Replace `frontend/public/assets/resume/riya-tyagi-resume.pdf` with the newly attached resume PDF (byte-for-byte update).
- Verify the Hero section “Download Resume” action still points to `/assets/resume/riya-tyagi-resume.pdf` and the file opens/downloads as a valid PDF.

**User-visible outcome:** Clicking “Download Resume” downloads/opens the resume PDF successfully in common browser viewers and desktop PDF readers without corruption or “invalid PDF” errors.
