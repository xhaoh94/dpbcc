import { proto } from "./proto/Proto";
// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { pb } from "./proto/ProtoCode";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    start () {
        let test = <pb.Test>{}
        test.id = "111";
        test.etype=111;
        test.position={x:1,y:2,z:3}
        let b = proto.encode(pb.Cmds.Test, test);
        let message = proto.decode(pb.Cmds.Test, b);
        console.log(message);
    }

}
