import { Component, QWeb } from "@odoo/owl";
import Ientcli from "./components/Ientcli.js";
import { justeGandalf } from "./utils.js";

Component.env = {
    qweb: new QWeb({ translateFn: justeGandalf }),
    _: justeGandalf,
};
const ientcli = new Ientcli();
ientcli.mount(document.body);
