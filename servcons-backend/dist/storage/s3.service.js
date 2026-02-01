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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const s3_1 = __importDefault(require("aws-sdk/clients/s3"));
let S3Service = class S3Service {
    cfg;
    s3;
    bucket;
    constructor(cfg) {
        this.cfg = cfg;
        const endpoint = this.cfg.get('S3_ENDPOINT');
        const region = this.cfg.get('S3_REGION') ?? 'us-east-1';
        const access = this.cfg.get('S3_ACCESS_KEY');
        const secret = this.cfg.get('S3_SECRET_KEY');
        const bucket = this.cfg.get('S3_BUCKET');
        if (!endpoint || !access || !secret || !bucket) {
            throw new Error('Faltan variables S3_*. Revisa tu .env (S3_ENDPOINT, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET).');
        }
        this.bucket = bucket;
        this.s3 = new s3_1.default({
            endpoint,
            region,
            accessKeyId: access,
            secretAccessKey: secret,
            s3ForcePathStyle: true,
            signatureVersion: 'v4',
        });
    }
    getUploadUrl(key) {
        return this.s3.getSignedUrl('putObject', {
            Bucket: this.bucket,
            Key: key,
            ContentType: 'application/pdf',
            Expires: 300,
        });
    }
    getDownloadUrl(key) {
        return this.s3.getSignedUrl('getObject', {
            Bucket: this.bucket,
            Key: key,
            Expires: 300,
        });
    }
};
exports.S3Service = S3Service;
exports.S3Service = S3Service = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], S3Service);
//# sourceMappingURL=s3.service.js.map