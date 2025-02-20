"use client";
import { User } from "@/common/models/user/user-model";
import { UserStore } from "@/common/stores/user/user-store";
import { useQuery } from "@tanstack/react-query";
import { getManyAssetsByClientService } from "@/service-providers/asset/get-many-assets-by-client-service";
import DataTable from "@/components/elements/common/data-table";
import React, { useEffect, useState } from "react";
import { getManyAssetParameters } from "@/providers/supabase/asset/get-many-asset-by-client-supabase";
import { Icons } from "../components/ui/icons";
import { SuppliersColumn } from "@/components/assemblies/application/teams/suppliers/data-table/supplier-columns";
import { DataTablePagination } from "@/components/elements/common/data-table-pagination2";
import { AssetDataTableToolbar } from "@/components/assemblies/application/workspace-settings/asset/data-table/asset-data-table-toolbar";
import { AssetColumns } from "@/components/assemblies/application/workspace-settings/asset/data-table/asset-columns";


const AssetList = () => {
  const currentUser: User | null = UserStore((state) => state.user);

  const [filters, setFilters] = useState<getManyAssetParameters>({
    keyword: "",
    page: 1,
    per_page: 10,
    is_deleted: false,
    req: {},
    client_id: currentUser?.client_id!,
  });

  // TanStack Query
  const {
    data: assets, isLoading, error

  } = useQuery({
    queryKey: ["getManyAssetsByClientService", filters],
    queryFn: () => getManyAssetsByClientService(filters),
    refetchOnWindowFocus: true,
    enabled: !!filters?.client_id
  });

  useEffect(() => {
    if (currentUser?.client_id) {
      setFilters({ ...filters, client_id: currentUser.client_id! })
    }

  }, [currentUser]);

  return (

    <div className=" flex-1 flex flex-col  overflow-hidden ">



      <AssetDataTableToolbar
        data={assets?.data ?? []}
        filters={filters}
        onChange={(value) => setFilters(value)}
      />

      {isLoading && !assets &&
        <div className="flex-grow bg flex justify-center items-center w-full">
          <Icons.spinner
            className="mr-2 h-12 w-12 mt-5 text-primary animate-spin" />
        </div>}


      {assets?.data && <div className={"bg-background mx-6 mt-8 flex flex-col overflow-hidden justify-between h-full flex-grow rounded-[10px] "}>
        <div className={"flex-1 overflow-hidden flex justify-center  text-sm  space-y-4"}>
          <DataTable data={assets?.data ?? []} columns={AssetColumns} />
        </div>
        <div className="!sticky bottom-0 bg-background border-t ">
          {assets?.data && (
            <DataTablePagination
              count={assets?.count ?? 0}
              per_page={filters.per_page}
              page={filters.page}
              onPageChange={(page) => {
                setFilters((prev) => {
                  return {
                    ...(prev ?? {}),
                    page,
                  };
                });
              }}
              onRowsPerPageChange={(value) => {
                setFilters((prev) => {
                  return {
                    ...(prev ?? {}),
                    per_page: value,
                  };
                });
              }}
            />
          )}
        </div>
      </div>
      }
    </div>
  )
    ;
};

export default AssetList;
