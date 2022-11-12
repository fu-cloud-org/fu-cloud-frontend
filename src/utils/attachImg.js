import {getBaseURL} from "@/utils/request";

export function attachImg (url) {
  return `${getBaseURL()}${url}`;
}