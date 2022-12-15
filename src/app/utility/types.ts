import Graph from 'graphology';

import {ExecutionStage} from './execution-stage/execution-stage';
import {GraphChange} from './graph-change/graph-change';

export type DisplayState = 'choose'|'addNode'|'addEdge'|'remove';

export type ElementType = 'node'|'edge';

export interface ElementDescriptor {
  key: string;
  type: ElementType;
}

/**
 * Web Workers are assumed environment of algorithm execution, however fallback
 * method for executing them in the main thread is necessary.
 *
 * submitStage callback is used in the implementation of the algorithm, in order
 * to avoid copy-pasting the same function and only changing the method of
 * submitting execution stage.
 *
 * In case of execution in the context of the webworker, submitStage will need
 * to be provided by algorithm implementation (it may be defined
 * as`(stage)=>{postMessage(stage);}` in most of the cases)
 *
 * In case of execution in the main thread, submitStage is provided by ShortPath
 * environment
 */
export type mainThreadAlgorithmCall =
    (graph: Graph, source: string, destination: string,
     submitStage: (stage: ExecutionStage) => void) => void;

export type GraphCheckResult = {
  message: string,
  markings: GraphChange[],
}

export type GraphCheck = (graph: Graph) => GraphCheckResult;

export type AttributeDescriptor = {
  name: string,
  defaultValue: number,
  visible: boolean,
  userModifiable: boolean,
}
