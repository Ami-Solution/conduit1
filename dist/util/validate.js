"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var json_schemas_1 = require("@0xproject/json-schemas");
var signedOrderSchema = json_schemas_1.schemas.signedOrderSchema;
var validator = new json_schemas_1.SchemaValidator();
var validateEndpointSignedOrderBySchema = function (order) {
    return validator.validate(order, signedOrderSchema);
};
exports.validateEndpointSignedOrderBySchema = validateEndpointSignedOrderBySchema;
//# sourceMappingURL=validate.js.map