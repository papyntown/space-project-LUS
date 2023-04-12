import { proxy } from "valtio";

interface State {
    intro: boolean;
    color: string;
    textArea: boolean;
}
const state: State = proxy({
    intro: true,
    color: "#68686e",
    textArea: false,
});
export default state;
