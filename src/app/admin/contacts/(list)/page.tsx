"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { ContactTable } from "./components";

const ContactList = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Filter Sidebar */}
      {/* <DynamicFilter
        schema={categoryFilterSchema}
        onSubmit={handleFilterSubmit}
        fieldConfig={filterFieldConfig}
      >
        <DynamicFilter.Sidebar
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
        >
          <div className="space-y-5">
            <DynamicFilter.Fields />
            <DynamicFilter.Actions />
          </div>
        </DynamicFilter.Sidebar>
      </DynamicFilter> */}

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="container max-w-7xl mx-auto space-y-6 p-6 lg:p-8">
          {/* Contact Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight">
                Quản lý liên hệ
              </h1>
              <p className="text-sm text-muted-foreground">
                Quản lý các liên hệ từ khách hàng trong hệ thống
              </p>
            </div>
            <div className="flex items-center gap-2">
              {/* <Button
                variant="outline"
                size="default"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="gap-2 relative"
              >
                <FilterIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Bộ lọc</span>
                {activeFiltersCount > 0 && (
                  <Badge
                    variant="default"
                    className="ml-1 h-5 min-w-5 px-1 text-xs font-medium"
                  >
                    {activeFiltersCount}
                  </Badge>
                )}
              </Button> */}
            </div>
          </div>

          {/* Content Table */}
          <ContactTable />
        </div>
      </div>
    </div>
  );
};

export default ContactList;
