export interface WebNodeStatus {
  code: number;
  message?: string;
}

export interface WebNodeReply<T = unknown> {
  messageId: string;
  status?: WebNodeStatus;
  entries?: T;
}

export interface WebNodeResponseObject<T = unknown> {
  requestId: string;
  status?: WebNodeStatus;
  replies?: WebNodeReply<T>[];
}

export interface WebNodeRequestObject {
  requestId: string;
  target: string;
  messages: Array<WebNodeWriteMessage | WebNodeQueryMessage>;
}

export interface WebNodeWriteMessage {
  data: string;
  descriptor: {
    method: 'CollectionsWrite';
    objectId: string;
    schema?: string;
    dateCreated: number;
    datePublished?: number;
    dataFormat?: string;
    cid: string;
  };
}

export interface WebNodeQueryMessage {
  descriptor: {
    method: 'CollectionsQuery';
    objectId?: string;
    schema?: string;
    dataFormat?: string;
    dateSort?:
      | 'createdAscending'
      | 'createdDescending'
      | 'publishedAscending'
      | 'publishedDescending';
    cid?: string;
  };
}
