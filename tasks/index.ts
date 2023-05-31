import { task, types } from "hardhat/config"

task("oftSend", "send tokens to another chain", require("./oftSend"))
    .addParam("qty", "qty of tokens to send")
    .addParam("targetNetwork", "the target network to let this instance receive messages from")

task("oftv2Send", "send tokens to another chain", require("./oftv2Send"))
    .addParam("qty", "qty of tokens to send")
    .addParam("targetNetwork", "the target network to let this instance receive messages from")

task("oftWithFeeSend", "send tokens to another chain", require("./oftWithFeeSend"))
    .addParam("qty", "qty of tokens to send")
    .addParam("targetNetwork", "the target network to let this instance receive messages from")
