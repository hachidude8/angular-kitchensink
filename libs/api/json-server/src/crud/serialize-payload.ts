import { SerializePayloadFn } from '@aks/core/crud';


export const serializePayload: SerializePayloadFn<Record<string, unknown>, unknown> = (payload) => {
  return { ...payload };
}
