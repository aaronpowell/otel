export * from "@opentelemetry/api";

import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import {
  NodeTracerProvider,
  SimpleSpanProcessor,
} from "@opentelemetry/sdk-trace-node";

import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";

export const registerOTel = (serviceName: string) => {
  const provider = new NodeTracerProvider({
    resource: new Resource({
      [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
    }),
  });

  provider.register();

  provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({})));

  return provider;
};
