import { pb } from "./ProtoCode";

export namespace proto {
    var $protobuf = window["protobuf"];
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    // var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    var $cfg = {};
    var types: { [key: string]: string } = {
        "0": "bool", "1": "string", "2": "bytes",
        "3": "float", "4": "double", "5": "enum",
        "6": "int32", "7": "int64",
        "8": "uint32", "9": "uint64",
        "10": "sint32", "11": "sint64",
        "12": "fixed32", "13": "fixed64",
        "14": "sfixed32", "15": "sfixed64"
    }
    var fns: { [key: string]: string } = {
        "bool": "bool", "string": "string", "bytes": "bytes",
        "float": "float", "double": "double", "enum": "int32",
        "int32": "int32", "int64": "int64",
        "uint32": "uint32", "uint64": "uint64",
        "sint32": "sint32", "sint64": "sint64",
        "fixed32": "fixed32", "fixed64": "fixed64",
        "sfixed32": "sfixed32", "sfixed64": "sfixed64"
    }
    var wireTypes: { [key: string]: number } = {
        "bool": 0, "string": 2, "bytes": 2,
        "int32": 0, "int64": 0,
        "uint32": 0, "uint64": 0,
        "sint32": 0, "sint64": 0,
        "fixed32": 5, "fixed64": 1,
        "sfixed32": 5, "sfixed64": 1,
        "float": 5, "double": 1, "enum": 0
    }
    var wireSize: { [key: string]: number } = {
        "bool": 8, "string": 8, "bytes": 8,
        "int32": 8, "int64": 8,
        "uint32": 8, "uint64": 8,
        "sint32": 8, "sint64": 8,
        "fixed32": 8, "fixed64": 8,
        "sfixed32": 8, "sfixed64": 8,
        "float": 8, "double": 8, "enum": 8
    }
    function getCfg(clsName: string, tag: number) {
        if (!$cfg[clsName]) {
            $cfg[clsName] = {};
        }
        if (!$cfg[clsName][tag]) {
            let cfgs = pb.cfgs[clsName];
            for (let cfg of cfgs) {
                if (cfg[0] === tag.toString()) {
                    $cfg[clsName][tag] = cfg;
                }
            }
        }
        return $cfg[clsName][tag];
    }
    export function encode(cmd: pb.Cmds | string, msg: any): Uint8Array {
        if (!msg) return;
        let clsName = typeof cmd === "number" ? pb.cmds[cmd] : cmd;
        if (!clsName) { console.log("未知的cmd:%d", cmd); return }
        let writer = serialize(clsName, msg)
        return writer.finish()
    }
    function serialize(clsName: string, msg, writer?: any) {
        if (!writer)
            writer = $Writer.create();
        let cfgs = pb.cfgs[clsName];
        if (!cfgs) { console.log("未知的clsName:%s", clsName); return; }
        let index = 0;
        let wireType = 0;
        for (let cfg of cfgs) {
            let tag = Number(cfg[0]);
            let name = cfg[1];
            let type = cfg[2];
            let isArray = cfg[3] === "1";
            if (types[type]) type = types[type]
            let size = wireSize[type] || 8;
            let wt = wireTypes[type] || 2;
            let dif = wt - wireType;
            wireType = isArray ? 2 : wireTypes[type] || 2
            index += size + dif;

            let f = msg[name];
            if (!f) continue;
            if (isArray && f.length === 0) continue;
            let fn = fns[type];
            if (isArray) {
                if (fn) {
                    if (type === "string" || type === "bytes") {
                        for (let i = 0; i < f.length; ++i) {
                            writer.uint32(index)[fn](f[i]);
                        }
                    } else {
                        writer.uint32(index).fork();
                        for (let i = 0; i < f.length; ++i) {
                            writer[fn](f[i])
                        }
                        writer.ldelim();
                    }
                } else {
                    for (let i = 0; i < f.length; ++i)
                        serialize(type, f[i], writer.uint32(index).fork()).ldelim();
                }

            } else {
                if (fn)
                    writer.uint32(index)[fn](f);
                else
                    serialize(type, f, writer.uint32(index).fork()).ldelim();
            }
        }
        return writer;
    }

    export function decode(cmd: pb.Cmds | string, buffer: Uint8Array) {
        let clsName = typeof cmd === "number" ? pb.cmds[cmd] : cmd;
        if (!clsName) { console.log("未知的cmd:%d", cmd); return; }
        let message = deserialize(clsName, buffer);
        return message;
    }
    function deserialize(clsName: string, reader: any | Uint8Array, length?: number): any {
        if (reader instanceof Uint8Array) reader = $Reader.create(reader);
        let end = length === undefined ? reader.len : reader.pos + length, message = {};
        while (reader.pos < end) {
            var tag = reader.uint32() >>> 3;
            let cfg = getCfg(clsName, tag);
            if (!cfg) { console.log("反序列时没找到clsName[%s]对应配置", clsName); reader.skipType(tag & 7); break; }
            let name = cfg[1];
            let type = cfg[2];
            if (types[type]) type = types[type]
            let isArray = cfg[3] === "1";
            let fn = fns[type];
            if (isArray) {
                if (!message[name]) message[name] = [];
                if (fn) {
                    if (type === "string" || type === "bytes") {
                        message[name].push(reader[fn]());
                    } else {
                        if ((tag & 7) === 2) {
                            var end2 = reader.uint32() + reader.pos;
                            while (reader.pos < end2) message[name].push(reader[fn]())
                        } else {
                            message[name].push(reader[fn]())
                        }
                    }
                } else {
                    message[name].push(deserialize(type, reader, reader.uint32()));
                }
            } else {
                if (fn)
                    message[name] = reader[fn]();
                else
                    message[name] = deserialize(type, reader, reader.uint32());
            }
        }
        return message;
    }
}