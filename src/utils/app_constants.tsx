
const API_URL = "https://core1stg.callmylist.com:8443/v1"
const HOST_NAME = "portalstg.callmylist.com"
const RESOURCE_URL = "https://resourcesstg.callmylist.com"
const timeZones = [
    {
        label: "US/Pacific Time (PST)",
        value: "US/Pacific",
        code: "PST"
    },
    { label: "US/Mountain Time (MST)", value: "US/Mountain", code: "MST" },
    { label: "US/Central Time (CST)", value: "US/Central", code: "CST" },
    { label: "US/Eastern Time (EST)", value: "US/Eastern", code: "EST" },
    { label: "US/Hawaii Time (HST)", value: "US/Hawaii", code: "HST" },
    { label: "Europe/London (GMT)", value: "Europe/London", code: "GMT" },
    { label: "Europe/Paris (CET)", value: "Europe/Paris", code: "CET" },
    { label: "Europe/Istanbul (TRT)", value: "Europe/Istanbul", code: "TRT" },
    { label: "Asia/Shanghai (CST)", value: "Asia/Shanghai", code: "CST" },
    { label: "Asia/Tokyo (JST)", value: "Asia/Tokyo", code: "JST" }]
export default {
    API_URL,
    HOST_NAME,
    RESOURCE_URL,
    timeZones
}