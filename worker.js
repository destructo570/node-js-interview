import { parentPort } from "worker_threads";

function cpu() {
  let sum = 0;
  for (let i = 0; i < 100; i++) {
    sum += i;
  }
  return sum;
}

// Perform the task and send the result back to the parent thread
const result = cpu();

parentPort.postMessage(result);
