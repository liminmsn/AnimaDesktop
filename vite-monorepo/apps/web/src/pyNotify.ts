type MonitorType<T> = (msg: T) => void;

const PYNotify = "py-notify"
const monitor_arr: MonitorType<any>[] = [];

export function add_monitor<T>(call: MonitorType<T>) {
  monitor_arr.push(call)
}

window.addEventListener(PYNotify, (e) => {
  const detail = (e as unknown as { detail: string }).detail
  monitor_arr.filter(call => call(detail))
  // console.log("收到 py-notify", detail);
});