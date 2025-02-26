"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const getReviewBD = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getReviewBD");
});
const storeReviewBD = (data) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getReviewBD");
});
const deleteReviewBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getReviewBD");
});
const updateReviewBD = (id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getReviewBD");
});
exports.reviewService = {
    getReviewBD,
    storeReviewBD,
    deleteReviewBD,
    updateReviewBD,
};
