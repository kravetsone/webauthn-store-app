/* eslint-disable */
// @generated by protobuf-ts 2.9.1 with parameter eslint_disable
// @generated from protobuf file "admin.proto" (syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message RelyingParty
 */
export interface RelyingParty {
    /**
     * @generated from protobuf field: optional string id = 1;
     */
    id?: string;
    /**
     * @generated from protobuf field: optional string name = 2;
     */
    name?: string;
}
/**
 * @generated from protobuf message User
 */
export interface User {
    /**
     * @generated from protobuf field: optional bytes id = 1;
     */
    id?: Uint8Array;
    /**
     * @generated from protobuf field: optional string display_name = 2;
     */
    displayName?: string;
    /**
     * @generated from protobuf field: optional string name = 3;
     */
    name?: string;
}
/**
 * @generated from protobuf message Identity
 */
export interface Identity {
    /**
     * @generated from protobuf field: optional bytes id = 1;
     */
    id?: Uint8Array;
    /**
     * @generated from protobuf field: optional RelyingParty website = 2;
     */
    website?: RelyingParty;
    /**
     * @generated from protobuf field: optional User user = 3;
     */
    user?: User;
    /**
     * @generated from protobuf field: optional bytes private_key = 4;
     */
    privateKey?: Uint8Array;
    /**
     * @generated from protobuf field: optional bytes public_key = 5;
     */
    publicKey?: Uint8Array;
    /**
     * @generated from protobuf field: optional int32 signature_counter = 6;
     */
    signatureCounter?: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class RelyingParty$Type extends MessageType<RelyingParty> {
    constructor() {
        super("RelyingParty", [
            { no: 1, name: "id", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "name", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<RelyingParty>): RelyingParty {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<RelyingParty>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: RelyingParty): RelyingParty {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional string id */ 1:
                    message.id = reader.string();
                    break;
                case /* optional string name */ 2:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: RelyingParty, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional string id = 1; */
        if (message.id !== undefined)
            writer.tag(1, WireType.LengthDelimited).string(message.id);
        /* optional string name = 2; */
        if (message.name !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message RelyingParty
 */
export const RelyingParty = new RelyingParty$Type();
// @generated message type with reflection information, may provide speed optimized methods
class User$Type extends MessageType<User> {
    constructor() {
        super("User", [
            { no: 1, name: "id", kind: "scalar", opt: true, T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "display_name", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ },
            { no: 3, name: "name", kind: "scalar", opt: true, T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<User>): User {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<User>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: User): User {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional bytes id */ 1:
                    message.id = reader.bytes();
                    break;
                case /* optional string display_name */ 2:
                    message.displayName = reader.string();
                    break;
                case /* optional string name */ 3:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: User, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional bytes id = 1; */
        if (message.id !== undefined)
            writer.tag(1, WireType.LengthDelimited).bytes(message.id);
        /* optional string display_name = 2; */
        if (message.displayName !== undefined)
            writer.tag(2, WireType.LengthDelimited).string(message.displayName);
        /* optional string name = 3; */
        if (message.name !== undefined)
            writer.tag(3, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message User
 */
export const User = new User$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Identity$Type extends MessageType<Identity> {
    constructor() {
        super("Identity", [
            { no: 1, name: "id", kind: "scalar", opt: true, T: 12 /*ScalarType.BYTES*/ },
            { no: 2, name: "website", kind: "message", T: () => RelyingParty },
            { no: 3, name: "user", kind: "message", T: () => User },
            { no: 4, name: "private_key", kind: "scalar", opt: true, T: 12 /*ScalarType.BYTES*/ },
            { no: 5, name: "public_key", kind: "scalar", opt: true, T: 12 /*ScalarType.BYTES*/ },
            { no: 6, name: "signature_counter", kind: "scalar", opt: true, T: 5 /*ScalarType.INT32*/ }
        ]);
    }
    create(value?: PartialMessage<Identity>): Identity {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Identity>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Identity): Identity {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* optional bytes id */ 1:
                    message.id = reader.bytes();
                    break;
                case /* optional RelyingParty website */ 2:
                    message.website = RelyingParty.internalBinaryRead(reader, reader.uint32(), options, message.website);
                    break;
                case /* optional User user */ 3:
                    message.user = User.internalBinaryRead(reader, reader.uint32(), options, message.user);
                    break;
                case /* optional bytes private_key */ 4:
                    message.privateKey = reader.bytes();
                    break;
                case /* optional bytes public_key */ 5:
                    message.publicKey = reader.bytes();
                    break;
                case /* optional int32 signature_counter */ 6:
                    message.signatureCounter = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Identity, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* optional bytes id = 1; */
        if (message.id !== undefined)
            writer.tag(1, WireType.LengthDelimited).bytes(message.id);
        /* optional RelyingParty website = 2; */
        if (message.website)
            RelyingParty.internalBinaryWrite(message.website, writer.tag(2, WireType.LengthDelimited).fork(), options).join();
        /* optional User user = 3; */
        if (message.user)
            User.internalBinaryWrite(message.user, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* optional bytes private_key = 4; */
        if (message.privateKey !== undefined)
            writer.tag(4, WireType.LengthDelimited).bytes(message.privateKey);
        /* optional bytes public_key = 5; */
        if (message.publicKey !== undefined)
            writer.tag(5, WireType.LengthDelimited).bytes(message.publicKey);
        /* optional int32 signature_counter = 6; */
        if (message.signatureCounter !== undefined)
            writer.tag(6, WireType.Varint).int32(message.signatureCounter);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message Identity
 */
export const Identity = new Identity$Type();