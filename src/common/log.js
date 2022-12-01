export default function log(message, data = null) {
  if(import.meta.env.DEV) {
    console.log(message, data);
  }
}