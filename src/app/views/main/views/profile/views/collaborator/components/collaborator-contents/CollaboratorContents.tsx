// Internal
import { PlusIcon } from "lucide-react";

// App
import { Button } from "@/components/ui/button";
import ContentTable from "@/components/modules/content/content-table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Internal

const ContentList = () => {
  const navigate = useNavigate();

  return (
    <Card className="space-y-6">
      {/* Category Header */}
      <CardHeader className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h2 className="text-2xl font-bold tracking-wider">
            Danh sách nội dung
          </h2>
          <p className="text-muted-foreground">
            Quản lý các nội dung trong hệ thống
          </p>
        </div>
        <Button onClick={() => navigate("content-create")}>
          <PlusIcon className="mr-2 size-4" />
          Thêm mới
        </Button>
      </CardHeader>

      {/* Content Table */}
      <CardContent>
        <ContentTable />
      </CardContent>
    </Card>
  );
};

export default ContentList;
