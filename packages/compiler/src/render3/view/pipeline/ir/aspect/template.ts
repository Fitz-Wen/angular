/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CreateList, CreateNode, Id, UpdateList} from '../node';
import {RootTemplate} from '../root';

export interface TemplateAspect {
  create: CreateList;
  update: UpdateList;
  decls: number|null;
  vars: number|null;
}

export interface TemplateAspectWithId extends TemplateAspect {
  id: Id;
}

export function hasTemplateAspect(node: RootTemplate): node is RootTemplate&TemplateAspect;
export function hasTemplateAspect<T extends CreateNode>(node: T): node is T&TemplateAspectWithId;
export function hasTemplateAspect(node: CreateNode|RootTemplate): boolean {
  return node instanceof RootTemplate ||
      ((node as any).create !== undefined && (node as any).update !== undefined);
}
