(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/currency.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "formatVND",
    ()=>formatVND
]);
function formatVND(amount) {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND"
    }).format(amount);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/file.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "downloadFile",
    ()=>downloadFile,
    "formatBytes",
    ()=>formatBytes,
    "formatFileSize",
    ()=>formatFileSize,
    "getFileIcon",
    ()=>getFileIcon,
    "getFileTypeLabel",
    ()=>getFileTypeLabel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/icons/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$excel$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExcelFileIcon$3e$__ = __turbopack_context__.i("[project]/src/components/icons/excel-file-icon.tsx [app-client] (ecmascript) <export default as ExcelFileIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileIcon$3e$__ = __turbopack_context__.i("[project]/src/components/icons/file-icon.tsx [app-client] (ecmascript) <export default as FileIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$pdf$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PdfFileIcon$3e$__ = __turbopack_context__.i("[project]/src/components/icons/pdf-file-icon.tsx [app-client] (ecmascript) <export default as PdfFileIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$image$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/icons/image-file-icon.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/enums/file.ts [app-client] (ecmascript)");
;
;
;
const formatFileSize = (bytes)=>{
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = [
        "B",
        "KB",
        "MB",
        "GB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};
const getFileIcon = (type)=>{
    switch(type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].PNG:
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].JPG:
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].IMAGE:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$image$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].PDF:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$pdf$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__PdfFileIcon$3e$__["PdfFileIcon"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].WORD:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$excel$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExcelFileIcon$3e$__["ExcelFileIcon"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].EXCEL:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$excel$2d$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExcelFileIcon$3e$__["ExcelFileIcon"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].RAR:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileIcon$3e$__["FileIcon"];
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].ZIP:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileIcon$3e$__["FileIcon"];
        default:
            return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$icons$2f$file$2d$icon$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileIcon$3e$__["FileIcon"];
    }
};
const getFileTypeLabel = (type)=>{
    switch(type){
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].IMAGE:
            return "Image File";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].PNG:
            return "PNG File";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].JPG:
            return "JPG File";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].PDF:
            return "PDF File";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].WORD:
            return "Word Document";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].DOCX:
            return "Word Document";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].EXCEL:
            return "Excel Spreadsheet";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].RAR:
            return "RAR File";
        case __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$enums$2f$file$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileType"].ZIP:
            return "ZIP File";
        default:
            return "OTHER";
    }
};
const formatBytes = (bytes, decimals = 2)=>{
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = [
        "Bytes",
        "KB",
        "MB",
        "GB",
        "TB",
        "PB",
        "EB",
        "ZB",
        "YB"
    ];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / k ** i).toFixed(dm)) + sizes[i];
};
function downloadFile(blob, title) {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/enums/content.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ContentStatus",
    ()=>ContentStatus
]);
var ContentStatus = /*#__PURE__*/ function(ContentStatus) {
    ContentStatus["PENDING"] = "pending";
    ContentStatus["APPROVED"] = "approved";
    ContentStatus["REJECTED"] = "rejected";
    return ContentStatus;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/enums/file.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "FileType",
    ()=>FileType
]);
var FileType = /*#__PURE__*/ function(FileType) {
    FileType["PDF"] = "PDF";
    FileType["PNG"] = "PNG";
    FileType["JPG"] = "JPG";
    FileType["IMAGE"] = "IMAGE";
    FileType["WORD"] = "WORD";
    FileType["DOCX"] = "DOCX";
    FileType["EXCEL"] = "EXCEL";
    FileType["RAR"] = "RAR";
    FileType["ZIP"] = "ZIP";
    FileType["OTHER"] = "OTHER";
    return FileType;
}({});
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/svg/file-48.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/file-48.4c0d8d0c.svg");}),
"[project]/src/assets/svg/file-48.svg.mjs { IMAGE => \"[project]/src/assets/svg/file-48.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$file$2d$48$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/svg/file-48.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$file$2d$48$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 48,
    height: 48,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/svg/file-96.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/file-96.809ddeaf.svg");}),
"[project]/src/assets/svg/file-96.svg.mjs { IMAGE => \"[project]/src/assets/svg/file-96.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$file$2d$96$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/svg/file-96.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$file$2d$96$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 96,
    height: 96,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/image/icon/pdf-94.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/pdf-94.5e6ce071.png");}),
"[project]/src/assets/image/icon/pdf-94.png.mjs { IMAGE => \"[project]/src/assets/image/icon/pdf-94.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$image$2f$icon$2f$pdf$2d$94$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/image/icon/pdf-94.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$image$2f$icon$2f$pdf$2d$94$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 94,
    height: 94,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAABCklEQVR42j2MS0sCUQBG71xtH/TATdCDUosYWjWLQAkfuJAkEHpNIDUtpm5tWqhhEjKm+EJxIwiu9Q+IoDtBV4JbwR8gI4466ELwXh1hPItvcw4fAEuO9w92XFY747LYGUZ/erih0VJABUII/jj+Ra41Rbna6Hf/s60Hw8W1FmrgOohy72heruNZvkgmoTRp37Ad297RJaUGkec3NCtV8MQfJVMhS+RUAYcc7g9ILU+UCbs9aJorYYn3kYHni0gogMOOu891IDjvUZ/34wH6JeNghoy8cSxYb9WAAgGL87XnjUniT3Io+hJD8TsiBa9snOJW6Ld2dY9G2sQaaTNroM1PJ+ems81tneIW4vNepUMb9X0AAAAASUVORK5CYII="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/svg/excel-48.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/excel-48.875fa1c5.svg");}),
"[project]/src/assets/svg/excel-48.svg.mjs { IMAGE => \"[project]/src/assets/svg/excel-48.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$excel$2d$48$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/svg/excel-48.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$excel$2d$48$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 48,
    height: 48,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/svg/excel-96.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/excel-96.4ac12519.svg");}),
"[project]/src/assets/svg/excel-96.svg.mjs { IMAGE => \"[project]/src/assets/svg/excel-96.svg (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$excel$2d$96$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/svg/excel-96.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$svg$2f$excel$2d$96$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 96,
    height: 96,
    blurWidth: 0,
    blurHeight: 0
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/assets/image/icon/image.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/image.e9236390.png");}),
"[project]/src/assets/image/icon/image.png.mjs { IMAGE => \"[project]/src/assets/image/icon/image.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$image$2f$icon$2f$image$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/image/icon/image.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$image$2f$icon$2f$image$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 512,
    height: 512,
    blurWidth: 8,
    blurHeight: 8,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAxElEQVR42mWPvwsBYRjH3/du8CMkknKuFMVgMCiz7RiUhZJN6rIhFsvNLDa7klWZJWXhdEeGy4LZwH9wD891vYmnvvX0/XyG5yHU7ww6JsWVe9cwPwFhI7/EUrZGeY4nODTqi7sWlStCTExrg7RWbpF8ukA5yhEqolBlQkCVIaF1QZjXD3zYIzABQVLvQerYtyTskDFBMkYwfWxh+dRBMob/Qu6sQOc+g/JlDJnT4Euwj/TumxBSW1Zwxw4Z+X3Tjokdsje0oGqqWLqbZgAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-mobile.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useIsMobile",
    ()=>useIsMobile
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_27d3faa9b1a9d8cd0e1872aee1c051b9/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const MOBILE_BREAKPOINT = 768;
function useIsMobile() {
    _s();
    const [isMobile, setIsMobile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(undefined);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useIsMobile.useEffect": ()=>{
            const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
            const onChange = {
                "useIsMobile.useEffect.onChange": ()=>{
                    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
                }
            }["useIsMobile.useEffect.onChange"];
            mql.addEventListener("change", onChange);
            setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
            return ({
                "useIsMobile.useEffect": ()=>mql.removeEventListener("change", onChange)
            })["useIsMobile.useEffect"];
        }
    }["useIsMobile.useEffect"], []);
    return !!isMobile;
}
_s(useIsMobile, "D6B2cPXNCaIbeOx+abFr1uxLRM0=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-watermark.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useWatermark",
    ()=>useWatermark
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_27d3faa9b1a9d8cd0e1872aee1c051b9/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useWatermark = (options = {})=>{
    _s();
    const { text = "TẠO BỞI BANVE.VN", rotation = -Math.PI / 6, overlayOpacity = 0.5, textOpacity = 0.7, fontSize = 22, fontFamily = "Arial", fontWeight = "bold", spacingX = 200, spacingY = 150, overlayColor, textColor, enableOverlay = true, blendMode = "overlay" } = options;
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useWatermark.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const drawWatermark = {
                "useWatermark.useEffect.drawWatermark": ()=>{
                    // Clear canvas
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    // Set canvas size to match parent
                    canvas.width = canvas.offsetWidth;
                    canvas.height = canvas.offsetHeight;
                    // Add semi-transparent overlay
                    if (enableOverlay) {
                        ctx.fillStyle = overlayColor || `rgba(0, 0, 0, ${overlayOpacity})`;
                        ctx.fillRect(0, 0, canvas.width, canvas.height);
                    }
                    // Draw watermark text
                    ctx.save();
                    ctx.translate(canvas.width / 2, canvas.height / 2);
                    ctx.rotate(rotation);
                    ctx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
                    ctx.fillStyle = textColor || `rgba(255, 255, 255, ${textOpacity})`;
                    ctx.textAlign = "center";
                    ctx.textBaseline = "middle";
                    // Draw multiple watermarks in a grid
                    for(let x = -canvas.width; x < canvas.width * 2; x += spacingX){
                        for(let y = -canvas.height; y < canvas.height * 2; y += spacingY){
                            ctx.fillText(text, x, y);
                        }
                    }
                    ctx.restore();
                }
            }["useWatermark.useEffect.drawWatermark"];
            // Initial draw
            drawWatermark();
            // Handle window resize
            const handleResize = {
                "useWatermark.useEffect.handleResize": ()=>{
                    drawWatermark();
                }
            }["useWatermark.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            // Cleanup
            return ({
                "useWatermark.useEffect": ()=>{
                    window.removeEventListener("resize", handleResize);
                }
            })["useWatermark.useEffect"];
        }
    }["useWatermark.useEffect"], [
        text,
        rotation,
        overlayOpacity,
        textOpacity,
        fontSize,
        fontFamily,
        fontWeight,
        spacingX,
        spacingY,
        overlayColor,
        textColor,
        enableOverlay
    ]);
    return canvasRef;
};
_s(useWatermark, "UJgi7ynoup7eqypjnwyX/s32POg=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-match-path.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-router@7.9.5_react-do_02a7415dfc3db4462fe74c57dbf58474/node_modules/react-router/dist/development/chunk-UIGDSWPH.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useMatchPath = ()=>{
    _s();
    const { pathname } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"])();
    const handleMatchPath = (pattern)=>{
        if (Array.isArray(pattern)) {
            return pattern.some((p)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPath"])({
                    path: p,
                    end: false
                }, pathname));
        }
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["matchPath"])({
            path: pattern,
            end: false
        }, pathname);
    };
    return handleMatchPath;
};
_s(useMatchPath, "qVMqkCpYCjknUqSjfMln5RFSkbo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLocation"]
    ];
});
const __TURBOPACK__default__export__ = useMatchPath;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-sse-stream.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useSSEStream
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/stores/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$use$2d$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useAuthStore$3e$__ = __turbopack_context__.i("[project]/src/stores/use-auth-store.ts [app-client] (ecmascript) <export default as useAuthStore>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_27d3faa9b1a9d8cd0e1872aee1c051b9/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
function useSSEStream({ url, enable = true, onEvent }) {
    _s();
    const abortRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    console.log("SSE Stream URL :", url, " Enable :", enable);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useSSEStream.useEffect": ()=>{
            const authStore = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$stores$2f$use$2d$auth$2d$store$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__useAuthStore$3e$__["useAuthStore"].getState();
            if (!url || !enable || !authStore.accessToken) {
                return undefined;
            }
            const controller = new AbortController();
            abortRef.current = controller;
            ({
                "useSSEStream.useEffect": async ()=>{
                    try {
                        const res = await fetch(url, {
                            headers: {
                                Authorization: `Bearer ${authStore.accessToken}`,
                                Accept: "text/event-stream"
                            },
                            signal: controller.signal
                        });
                        if (!res.body) return;
                        const reader = res.body.getReader();
                        const decoder = new TextDecoder();
                        let buffer = "";
                        try {
                            while(true){
                                const { done, value } = await reader.read();
                                if (done) break;
                                buffer += decoder.decode(value, {
                                    stream: true
                                });
                                const lines = buffer.split("\n");
                                buffer = lines.pop() || "";
                                let eventName = "message";
                                for (const line of lines){
                                    if (line.startsWith("event:")) {
                                        eventName = line.replace("event:", "").trim();
                                    }
                                    if (line.startsWith("data:")) {
                                        const json = line.replace("data:", "").trim();
                                        try {
                                            onEvent(eventName, JSON.parse(json));
                                        } catch (parseError) {
                                            console.error("Failed to parse SSE data:", json, parseError);
                                        }
                                    }
                                }
                            }
                        } catch (readError) {
                            if (readError.name !== 'AbortError') {
                                console.error("Error reading SSE stream:", readError);
                            }
                        } finally{
                            reader.releaseLock();
                        }
                    } catch (fetchError) {
                        if (fetchError.name !== 'AbortError') {
                            console.error("Error fetching SSE stream:", fetchError);
                        }
                    }
                }
            })["useSSEStream.useEffect"]();
            return ({
                "useSSEStream.useEffect": ()=>{
                    console.log("CLOSE CONNECTING");
                    if (controller && !controller.signal.aborted) {
                        controller.abort();
                    }
                }
            })["useSSEStream.useEffect"];
        }
    }["useSSEStream.useEffect"], [
        url,
        enable,
        onEvent
    ]);
}
_s(useSSEStream, "39rk7Ugg2UQFa/gQqUmcTz2QC7I=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-dialog-state.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useDialogState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_27d3faa9b1a9d8cd0e1872aee1c051b9/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useDialogState(initialState = null) {
    _s();
    const [open, _setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const setOpen = (str)=>_setOpen((prev)=>prev === str ? null : str);
    return [
        open,
        setOpen
    ];
}
_s(useDialogState, "k9UFZo4ePG8w1n9cRxxAWfTCQ24=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-upload-media.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_27d3faa9b1a9d8cd0e1872aee1c051b9/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/api/endpoints/files.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$index$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/components/shared/uploader/index.ts [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/shared/uploader/lib/types.ts [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
// ============================================
// Hook Implementation
// ============================================
const useUploadMedia = ()=>{
    _s();
    // State
    const [uploadProgress, setUploadProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    // Mutation
    const uploadMutation = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePostApiFileUpload"])({
        mutation: {
            onError: {
                "useUploadMedia.usePostApiFileUpload[uploadMutation]": (error, variables)=>{
                    const file = variables.data.file;
                    const fileName = file instanceof File ? file.name : "unknown";
                    updateProgress(fileName, {
                        progress: 0,
                        status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].ERROR,
                        error: error?.message || "Upload failed"
                    });
                }
            }["useUploadMedia.usePostApiFileUpload[uploadMutation]"]
        }
    });
    // Computed
    const isUploading = uploadMutation.isPending;
    // ============================================
    // Helper Functions
    // ============================================
    const updateProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUploadMedia.useCallback[updateProgress]": (fileName, update)=>{
            setUploadProgress({
                "useUploadMedia.useCallback[updateProgress]": (prev)=>({
                        ...prev,
                        [fileName]: {
                            fileName,
                            progress: prev[fileName]?.progress || 0,
                            status: prev[fileName]?.status || __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].PENDING,
                            ...update
                        }
                    })
            }["useUploadMedia.useCallback[updateProgress]"]);
        }
    }["useUploadMedia.useCallback[updateProgress]"], []);
    const resetProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUploadMedia.useCallback[resetProgress]": ()=>{
            setUploadProgress({});
        }
    }["useUploadMedia.useCallback[resetProgress]"], []);
    const clearProgress = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUploadMedia.useCallback[clearProgress]": (fileName)=>{
            setUploadProgress({
                "useUploadMedia.useCallback[clearProgress]": (prev)=>{
                    const newProgress = {
                        ...prev
                    };
                    delete newProgress[fileName];
                    return newProgress;
                }
            }["useUploadMedia.useCallback[clearProgress]"]);
        }
    }["useUploadMedia.useCallback[clearProgress]"], []);
    // ============================================
    // Upload Methods
    // ============================================
    /**
   * Upload single file
   */ const uploadSingle = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUploadMedia.useCallback[uploadSingle]": async (file, options = {})=>{
            const fileName = file.name;
            try {
                // Initialize progress
                updateProgress(fileName, {
                    progress: 0,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].PENDING
                });
                // Prepare payload
                const payload = {
                    file,
                    ...options
                };
                // Start upload
                updateProgress(fileName, {
                    progress: 50
                });
                const response = await uploadMutation.mutateAsync({
                    data: payload
                });
                // Success
                updateProgress(fileName, {
                    progress: 100,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].SUCCESS
                });
                return response.data ?? null;
            } catch (error) {
                // Error handled in mutation onError
                console.error("Upload failed:", error);
                return null;
            }
        }
    }["useUploadMedia.useCallback[uploadSingle]"], [
        uploadMutation,
        updateProgress
    ]);
    /**
   * Upload multiple files sequentially
   */ const uploadMultiple = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUploadMedia.useCallback[uploadMultiple]": async (files, options = {})=>{
            const results = [];
            for (const file of files){
                const result = await uploadSingle(file, options);
                if (result) {
                    results.push(result);
                }
            }
            return results;
        }
    }["useUploadMedia.useCallback[uploadMultiple]"], [
        uploadSingle
    ]);
    /**
   * Upload main file with preview images (up to 4 images)
   */ const uploadWithImages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useUploadMedia.useCallback[uploadWithImages]": async (mainFile, images, options = {})=>{
            const fileName = mainFile.name;
            try {
                // Validate images count
                if (images.length > 4) {
                    throw new Error("Maximum 4 preview images allowed");
                }
                // Initialize progress
                updateProgress(fileName, {
                    progress: 0,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].PENDING
                });
                // Prepare payload with images
                const payload = {
                    file: mainFile,
                    image1: images[0],
                    image2: images[1],
                    image3: images[2],
                    image4: images[3],
                    ...options
                };
                // Start upload
                updateProgress(fileName, {
                    progress: 50
                });
                const response = await uploadMutation.mutateAsync({
                    data: payload
                });
                // Success
                updateProgress(fileName, {
                    progress: 100,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].SUCCESS
                });
                return response.data ?? null;
            } catch (error) {
                const errorMessage = error instanceof Error ? error.message : "Upload failed";
                updateProgress(fileName, {
                    progress: 0,
                    status: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$shared$2f$uploader$2f$lib$2f$types$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FileStatus"].ERROR,
                    error: errorMessage
                });
                console.error("Upload with images failed:", error);
                return null;
            }
        }
    }["useUploadMedia.useCallback[uploadWithImages]"], [
        uploadMutation,
        updateProgress
    ]);
    // ============================================
    // Return
    // ============================================
    return {
        // State
        uploadProgress,
        isUploading,
        // Methods
        uploadSingle,
        uploadMultiple,
        uploadWithImages,
        // Helpers
        resetProgress,
        clearProgress
    };
};
_s(useUploadMedia, "EzAdIMw+hzUsLHidpHUtQ3OLuoo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$api$2f$endpoints$2f$files$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePostApiFileUpload"]
    ];
});
const __TURBOPACK__default__export__ = useUploadMedia;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-required-path-params.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/react-router@7.9.5_react-do_02a7415dfc3db4462fe74c57dbf58474/node_modules/react-router/dist/development/chunk-UIGDSWPH.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useRequiredPathParams = (requiredParams)=>{
    _s();
    const routeParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    for (const param of requiredParams){
        const value = routeParams[param];
        if (!value) {
            throw new Error(`This component should not be rendered on a route which does not have the ${param} parameter`);
        }
    }
    return routeParams;
};
_s(useRequiredPathParams, "l42uboXPTRBdBviCwnaTibLYCjE=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$react$2d$router$40$7$2e$9$2e$5_react$2d$do_02a7415dfc3db4462fe74c57dbf58474$2f$node_modules$2f$react$2d$router$2f$dist$2f$development$2f$chunk$2d$UIGDSWPH$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
const __TURBOPACK__default__export__ = useRequiredPathParams;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-count-down.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>useCountDown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.1.1_@babel+core@7.2_27d3faa9b1a9d8cd0e1872aee1c051b9/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
function useCountDown({ seconds, onFinish, autoStart = false }) {
    _s();
    const [timeLeft, setTimeLeft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(seconds);
    const [isRunning, setIsRunning] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(autoStart);
    const intervalRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const onFinishRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(onFinish);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountDown.useEffect": ()=>{
            onFinishRef.current = onFinish;
        }
    }["useCountDown.useEffect"], [
        onFinish
    ]);
    const clear = ()=>{
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCountDown.useCallback[start]": ()=>{
            if (intervalRef.current) return;
            setIsRunning(true);
            intervalRef.current = setInterval({
                "useCountDown.useCallback[start]": ()=>{
                    setTimeLeft({
                        "useCountDown.useCallback[start]": (prev)=>{
                            if (prev <= 1) {
                                clear();
                                setIsRunning(false);
                                onFinishRef.current?.();
                                return 0;
                            }
                            return prev - 1;
                        }
                    }["useCountDown.useCallback[start]"]);
                }
            }["useCountDown.useCallback[start]"], 1000);
        }
    }["useCountDown.useCallback[start]"], []);
    const reset = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "useCountDown.useCallback[reset]": ()=>{
            clear();
            setTimeLeft(seconds);
            setIsRunning(false);
        }
    }["useCountDown.useCallback[reset]"], [
        seconds
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$1$2e$1_$40$babel$2b$core$40$7$2e$2_27d3faa9b1a9d8cd0e1872aee1c051b9$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCountDown.useEffect": ()=>{
            if (autoStart) {
                start();
            }
            return clear;
        }
    }["useCountDown.useEffect"], [
        autoStart,
        start
    ]);
    return {
        timeLeft,
        isRunning,
        start,
        reset
    };
}
_s(useCountDown, "yCEa+Rrp28eipuDHlnq6pCSyRxw=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/index.ts [app-client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$watermark$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-watermark.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$match$2d$path$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-match-path.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$sse$2d$stream$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-sse-stream.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$dialog$2d$state$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-dialog-state.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$upload$2d$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-upload-media.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$required$2d$path$2d$params$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-required-path-params.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$count$2d$down$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-count-down.ts [app-client] (ecmascript)");
;
;
;
;
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/hooks/use-upload-media.ts [app-client] (ecmascript) <export default as useUploadMedia>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useUploadMedia",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$upload$2d$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$hooks$2f$use$2d$upload$2d$media$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/hooks/use-upload-media.ts [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=src_db9810d1._.js.map