"use client";

// Core
import { useState, useMemo } from "react";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";

// App
import { Input } from "@/components/ui/input";
import { DataTable } from "@/components/shared";

// Internal
import { UserRankingTableRow } from "./lib/types";
import { useUserRankingTableColumnsDefs } from "./lib/hooks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const RankingTable = () => {
  // Hooks
  const router = useRouter();

  // States
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Page index bắt đầu từ 0
    pageSize: 10,
  });

  const mockUserRankingData: UserRankingTableRow[] = useMemo(
    () => [
      {
        id: "1",
        fullName: "John Doe",
        email: "john.doe@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        phoneNumber: "123-456-7890",
        dateOfBirth: "1990-01-15",
        gender: "male",
        ranking: 1,
        totalPosts: 45,
        totalLikes: 1200,
      },
      {
        id: "2",
        fullName: "Jane Smith",
        email: "jane.smith@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
        phoneNumber: "098-765-4321",
        dateOfBirth: "1992-05-22",
        gender: "female",
        ranking: 2,
        totalPosts: 38,
        totalLikes: 1100,
      },
      {
        id: "3",
        fullName: "Alex Johnson",
        email: "alex.johnson@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        phoneNumber: "555-123-4567",
        dateOfBirth: "1988-11-30",
        gender: "male",
        ranking: 3,
        totalPosts: 30,
        totalLikes: 900,
      },
      {
        id: "4",
        fullName: "Emily Davis",
        email: "emily.davis@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/4.jpg",
        phoneNumber: "555-987-6543",
        dateOfBirth: "1996-06-18",
        gender: "female",
        ranking: 4,
        totalPosts: 25,
        totalLikes: 800,
      },
      {
        id: "5",
        fullName: "Michael Brown",
        email: "michael.brown@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/5.jpg",
        phoneNumber: "111-222-3333",
        dateOfBirth: "1985-03-10",
        gender: "male",
        ranking: 5,
        totalPosts: 20,
        totalLikes: 700,
      },
      {
        id: "6",
        fullName: "Sarah Wilson",
        email: "sarah.wilson@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/women/6.jpg",
        phoneNumber: "444-555-6666",
        dateOfBirth: "1993-07-19",
        gender: "female",
        ranking: 6,
        totalPosts: 18,
        totalLikes: 600,
      },
      {
        id: "7",
        fullName: "David Miller",
        email: "david.miller@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/7.jpg",
        phoneNumber: "777-888-9999",
        dateOfBirth: "1991-12-25",
        gender: "male",
        ranking: 7,
        totalPosts: 15,
        totalLikes: 500,
      },
      {
        id: "8",
        fullName: "Lisa Taylor",
        email: "lisa.taylor@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/8.jpg",
        phoneNumber: "111-222-3333",
        dateOfBirth: "1994-09-05",
        gender: "female",
        ranking: 8,
        totalPosts: 12,
        totalLikes: 400,
      },
      {
        id: "9",
        fullName: "James Anderson",
        email: "james.anderson@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg",
        phoneNumber: "222-333-4444",
        dateOfBirth: "1989-04-12",
        gender: "male",
        ranking: 9,
        totalPosts: 10,
        totalLikes: 300,
      },
      {
        id: "10",
        fullName: "Emma Thomas",
        email: "emma.thomas@example.com",
        avatarUrl: "https://randomuser.me/api/portraits/women/10.jpg",
        phoneNumber: "333-444-5555",
        dateOfBirth: "1995-08-20",
        gender: "female",
        ranking: 10,
        totalPosts: 8,
        totalLikes: 200,
      },
    ],
    []
  );

  // Lọc dữ liệu dựa trên search term
  const filteredData = useMemo(() => {
    if (!searchTerm) return mockUserRankingData;

    const lowerSearchTerm = searchTerm.toLowerCase();
    return mockUserRankingData.filter(
      (user) =>
        user.fullName?.toLowerCase().includes(lowerSearchTerm) ||
        user.email?.toLowerCase().includes(lowerSearchTerm) ||
        (user.phoneNumber && user.phoneNumber.includes(searchTerm))
    );
  }, [searchTerm, mockUserRankingData]);

  const columns = useUserRankingTableColumnsDefs({
    onEdit: () => {},
  });

  return (
    <Card className="space-y-4">
      {/* Search */}
      <CardHeader>
        <CardTitle className="text-base font-semibold">Bảng xếp hạng</CardTitle>
        <CardDescription className="text-gray-400">
          {" "}
          Bảng xếp hạng người dùng theo tuần
        </CardDescription>
        <div className="relative max-w-sm flex-1">
          <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>

      <CardContent>
        <DataTable<UserRankingTableRow>
          columns={columns}
          data={filteredData}
          manualPagination={true}
          rowCount={filteredData.length}
          state={{ pagination }}
          onPaginationChange={setPagination}
          enableRowSelection
        >
          <DataTable.Content>
            <DataTable.Header />
            <DataTable.Body />
          </DataTable.Content>
          <DataTable.Pagination />
        </DataTable>
      </CardContent>
    </Card>
  );
};

export default RankingTable;
