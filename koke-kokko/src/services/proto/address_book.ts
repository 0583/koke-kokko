/**
 * Generated by the protoc-gen-ts.  DO NOT EDIT!
 * compiler version: 3.6.1
 * source: address_book.proto
 * git: https://github.com/thesayyn/protoc-gen-ts */
import * as dependency_1 from "./record_metadata_options";
import * as pb_1 from "google-protobuf";
export namespace example {
    export class Person extends pb_1.Message {
        constructor(data?: any[] | {
            id?: number;
            name?: string;
            email?: string;
            phones?: Person.PhoneNumber[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [4], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("name" in data && data.name != undefined) {
                    this.name = data.name;
                }
                if ("email" in data && data.email != undefined) {
                    this.email = data.email;
                }
                if ("phones" in data && data.phones != undefined) {
                    this.phones = data.phones;
                }
            }
        }
        get id() {
            return pb_1.Message.getField(this, 1) as number;
        }
        set id(value: number) {
            pb_1.Message.setField(this, 1, value);
        }
        get name() {
            return pb_1.Message.getField(this, 2) as string;
        }
        set name(value: string) {
            pb_1.Message.setField(this, 2, value);
        }
        get email() {
            return pb_1.Message.getField(this, 3) as string;
        }
        set email(value: string) {
            pb_1.Message.setField(this, 3, value);
        }
        get phones() {
            return pb_1.Message.getRepeatedWrapperField(this, Person.PhoneNumber, 4) as Person.PhoneNumber[];
        }
        set phones(value: Person.PhoneNumber[]) {
            pb_1.Message.setRepeatedWrapperField(this, 4, value);
        }
        static fromObject(data: {
            id?: number;
            name?: string;
            email?: string;
            phones?: ReturnType<typeof Person.PhoneNumber.prototype.toObject>[];
        }) {
            const message = new Person({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.name != null) {
                message.name = data.name;
            }
            if (data.email != null) {
                message.email = data.email;
            }
            if (data.phones != null) {
                message.phones = data.phones.map(item => Person.PhoneNumber.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data: {
                id?: number;
                name?: string;
                email?: string;
                phones?: ReturnType<typeof Person.PhoneNumber.prototype.toObject>[];
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.name != null) {
                data.name = this.name;
            }
            if (this.email != null) {
                data.email = this.email;
            }
            if (this.phones != null) {
                data.phones = this.phones.map((item: Person.PhoneNumber) => item.toObject());
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (this.id !== undefined)
                writer.writeInt32(1, this.id);
            if (typeof this.name === "string" && this.name.length)
                writer.writeString(2, this.name);
            if (typeof this.email === "string" && this.email.length)
                writer.writeString(3, this.email);
            if (this.phones !== undefined)
                writer.writeRepeatedMessage(4, this.phones, (item: Person.PhoneNumber) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): Person {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new Person();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readInt32();
                        break;
                    case 2:
                        message.name = reader.readString();
                        break;
                    case 3:
                        message.email = reader.readString();
                        break;
                    case 4:
                        reader.readMessage(message.phones, () => pb_1.Message.addToRepeatedWrapperField(message, 4, Person.PhoneNumber.deserialize(reader), Person.PhoneNumber));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): Person {
            return Person.deserialize(bytes);
        }
    }
    export namespace Person {
        export enum PhoneType {
            NONE = 0,
            MOBILE = 1,
            HOME = 2,
            WORK = 3
        }
        export class PhoneNumber extends pb_1.Message {
            constructor(data?: any[] | {
                number?: string;
                type?: Person.PhoneType;
            }) {
                super();
                pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [], []);
                if (!Array.isArray(data) && typeof data == "object") {
                    if ("number" in data && data.number != undefined) {
                        this.number = data.number;
                    }
                    if ("type" in data && data.type != undefined) {
                        this.type = data.type;
                    }
                }
            }
            get number() {
                return pb_1.Message.getField(this, 1) as string;
            }
            set number(value: string) {
                pb_1.Message.setField(this, 1, value);
            }
            get type() {
                return pb_1.Message.getField(this, 2) as Person.PhoneType;
            }
            set type(value: Person.PhoneType) {
                pb_1.Message.setField(this, 2, value);
            }
            static fromObject(data: {
                number?: string;
                type?: Person.PhoneType;
            }) {
                const message = new PhoneNumber({});
                if (data.number != null) {
                    message.number = data.number;
                }
                if (data.type != null) {
                    message.type = data.type;
                }
                return message;
            }
            toObject() {
                const data: {
                    number?: string;
                    type?: Person.PhoneType;
                } = {};
                if (this.number != null) {
                    data.number = this.number;
                }
                if (this.type != null) {
                    data.type = this.type;
                }
                return data;
            }
            serialize(): Uint8Array;
            serialize(w: pb_1.BinaryWriter): void;
            serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
                const writer = w || new pb_1.BinaryWriter();
                if (typeof this.number === "string" && this.number.length)
                    writer.writeString(1, this.number);
                if (this.type !== undefined)
                    writer.writeEnum(2, this.type);
                if (!w)
                    return writer.getResultBuffer();
            }
            static deserialize(bytes: Uint8Array | pb_1.BinaryReader): PhoneNumber {
                const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new PhoneNumber();
                while (reader.nextField()) {
                    if (reader.isEndGroup())
                        break;
                    switch (reader.getFieldNumber()) {
                        case 1:
                            message.number = reader.readString();
                            break;
                        case 2:
                            message.type = reader.readEnum();
                            break;
                        default: reader.skipField();
                    }
                }
                return message;
            }
            serializeBinary(): Uint8Array {
                return this.serialize();
            }
            static deserializeBinary(bytes: Uint8Array): PhoneNumber {
                return PhoneNumber.deserialize(bytes);
            }
        }
    }
    export class AddressBook extends pb_1.Message {
        constructor(data?: any[] | {
            id?: string;
            people?: Person[];
        }) {
            super();
            pb_1.Message.initialize(this, Array.isArray(data) ? data : [], 0, -1, [2], []);
            if (!Array.isArray(data) && typeof data == "object") {
                if ("id" in data && data.id != undefined) {
                    this.id = data.id;
                }
                if ("people" in data && data.people != undefined) {
                    this.people = data.people;
                }
            }
        }
        get id() {
            return pb_1.Message.getField(this, 1) as string;
        }
        set id(value: string) {
            pb_1.Message.setField(this, 1, value);
        }
        get people() {
            return pb_1.Message.getRepeatedWrapperField(this, Person, 2) as Person[];
        }
        set people(value: Person[]) {
            pb_1.Message.setRepeatedWrapperField(this, 2, value);
        }
        static fromObject(data: {
            id?: string;
            people?: ReturnType<typeof Person.prototype.toObject>[];
        }) {
            const message = new AddressBook({});
            if (data.id != null) {
                message.id = data.id;
            }
            if (data.people != null) {
                message.people = data.people.map(item => Person.fromObject(item));
            }
            return message;
        }
        toObject() {
            const data: {
                id?: string;
                people?: ReturnType<typeof Person.prototype.toObject>[];
            } = {};
            if (this.id != null) {
                data.id = this.id;
            }
            if (this.people != null) {
                data.people = this.people.map((item: Person) => item.toObject());
            }
            return data;
        }
        serialize(): Uint8Array;
        serialize(w: pb_1.BinaryWriter): void;
        serialize(w?: pb_1.BinaryWriter): Uint8Array | void {
            const writer = w || new pb_1.BinaryWriter();
            if (typeof this.id === "string" && this.id.length)
                writer.writeString(1, this.id);
            if (this.people !== undefined)
                writer.writeRepeatedMessage(2, this.people, (item: Person) => item.serialize(writer));
            if (!w)
                return writer.getResultBuffer();
        }
        static deserialize(bytes: Uint8Array | pb_1.BinaryReader): AddressBook {
            const reader = bytes instanceof pb_1.BinaryReader ? bytes : new pb_1.BinaryReader(bytes), message = new AddressBook();
            while (reader.nextField()) {
                if (reader.isEndGroup())
                    break;
                switch (reader.getFieldNumber()) {
                    case 1:
                        message.id = reader.readString();
                        break;
                    case 2:
                        reader.readMessage(message.people, () => pb_1.Message.addToRepeatedWrapperField(message, 2, Person.deserialize(reader), Person));
                        break;
                    default: reader.skipField();
                }
            }
            return message;
        }
        serializeBinary(): Uint8Array {
            return this.serialize();
        }
        static deserializeBinary(bytes: Uint8Array): AddressBook {
            return AddressBook.deserialize(bytes);
        }
    }
}