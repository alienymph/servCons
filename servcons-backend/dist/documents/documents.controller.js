"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentsController = void 0;
const common_1 = require("@nestjs/common");
const documents_service_1 = require("./documents.service");
const s3_service_1 = require("../storage/s3.service");
let DocumentsController = class DocumentsController {
    docs;
    s3;
    constructor(docs, s3) {
        this.docs = docs;
        this.s3 = s3;
    }
    async create(dto) {
        const doc = await this.docs.createDocument(dto);
        const key = `docs/${doc.id}/${Date.now()}.pdf`;
        const uploadUrl = this.s3.getUploadUrl(key);
        await this.docs.createVersion(doc.id, { version: 1, s3Key: key });
        return { id: doc.id, uploadUrl };
    }
    async list(q) {
        return this.docs.list(q);
    }
    async getOne(id) {
        return this.docs.getOne(id);
    }
    async preview(id, v) {
        const key = await this.docs.getKey(id, Number(v));
        return { url: this.s3.getDownloadUrl(key) };
    }
};
exports.DocumentsController = DocumentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('q')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "list", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "getOne", null);
__decorate([
    (0, common_1.Get)(':id/versions/:v/preview'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('v')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DocumentsController.prototype, "preview", null);
exports.DocumentsController = DocumentsController = __decorate([
    (0, common_1.Controller)('documents'),
    __metadata("design:paramtypes", [documents_service_1.DocumentsService, s3_service_1.S3Service])
], DocumentsController);
//# sourceMappingURL=documents.controller.js.map