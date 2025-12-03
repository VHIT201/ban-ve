import axios from "axios";
import { defineConfig } from "orval";
import baseConfig from "./src/configs/base";

const orvalConfig = async () => {
  const { backendDomain, frontendDomain } = baseConfig;

  const [mainApiSwagger, fileUploadServiceSwagger] = await Promise.all([
    axios.get(`${backendDomain}api-docs.json`, {
      headers: { Origin: frontendDomain },
    }),
    axios
      .get(`${backendDomain}/storage/swagger/json`, {
        headers: { Origin: frontendDomain },
      })
      .catch(() => ({ data: null })), // Fallback nếu không có file upload service
  ]);

  const config: any = {
    "main-api": {
      output: {
        mode: "tags",
        target: "src/api/endpoints",
        schemas: "src/api/models",
        client: "react-query",
        clean: true,
        prettier: true,
        override: {
          query: {
            useQuery: true,
            useInfinite: true,
            useInfiniteQueryParam: "page",
            useMutation: true,
            signal: true,
            version: 5,
          },
          mutator: {
            path: "src/api/mutator/custom-instance.ts",
            name: "mainInstance",
          },
          header: () => "// @ts-nocheck\r\n",
          operations: {
            // Thêm các operations đặc biệt nếu cần
            // postSystemBackup: {
            //   mutator: {
            //     path: 'src/api/mutator/fetch-instance.ts',
            //     name: 'fetchInstance'
            //   }
            // }
          },
        },
      },
      input: {
        target: mainApiSwagger.data,
        filters: {
          // Lọc theo tags nếu cần
          // tags: ['Authentication', 'Blueprints', 'Users']
        },
      },
    },
  };

  // Thêm file upload service nếu có
  if (fileUploadServiceSwagger.data) {
    config["file-upload-service"] = {
      output: {
        mode: "tags",
        target: "src/api/endpoints",
        schemas: "src/api/models",
        client: "react-query",
        clean: false, // Không xóa để không conflict với main-api
        prettier: true,
        override: {
          query: {
            useQuery: true,
            useInfinite: true,
            useInfiniteQueryParam: "page",
          },
          mutator: {
            path: "src/api/mutator/custom-instance.ts",
            name: "fileUploadServiceInstance",
          },
          header: () => "// @ts-nocheck\r\n",
        },
      },
      input: {
        target: fileUploadServiceSwagger.data,
        filters: {
          tags: ["Upload", "Files"],
        },
      },
    };
  }

  return defineConfig(config);
};

export default orvalConfig;
