"use client";

import withAuth from "@/app/lib/withAuth";
import AccountList from "@/app/ui/admin/AccountList";

function AccountsPage() {
  return (
    <div className="container mx-auto p-6">
      <AccountList />
    </div>
  );
}

export default withAuth(AccountsPage, ["admin"]);