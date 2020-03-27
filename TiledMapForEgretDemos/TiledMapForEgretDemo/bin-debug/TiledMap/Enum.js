var Enum;
(function (Enum) {
    /*************************** */
    //地图类型
    var mapLayer;
    (function (mapLayer) {
        mapLayer[mapLayer["blocks"] = 0] = "blocks";
        mapLayer[mapLayer["foreblocks"] = 1] = "foreblocks";
        mapLayer[mapLayer["mostfore"] = 2] = "mostfore";
        mapLayer[mapLayer["interaction"] = 3] = "interaction";
        mapLayer[mapLayer["boy"] = 4] = "boy";
        mapLayer[mapLayer["clounds"] = 5] = "clounds";
        mapLayer[mapLayer["grid"] = 6] = "grid";
    })(mapLayer = Enum.mapLayer || (Enum.mapLayer = {}));
})(Enum || (Enum = {}));
//# sourceMappingURL=Enum.js.map