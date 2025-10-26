import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="border-t border-border py-12">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Amadi-Sheriff Delight
          </p>
        </div>
      </footer>
    </>
  );
}
