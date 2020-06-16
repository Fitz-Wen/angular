/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ConstantPool} from '@angular/compiler/src/constant_pool';

import * as o from '../../../../output/output_ast';
import {RootTemplate} from '../ir/api';
import {CreateEmitter, UpdateEmitter} from '../output/api';

import {AdvanceEmitter} from './emitters/advance_emitter';
import {ElementNodeEmitter} from './emitters/element_node_emitter';
import {TemplateEmitter} from './emitters/template_emitter';
import {TextInterpolateEmitter, TextNodeEmitter} from './emitters/text_node_emitter';
import {UnsupportedCreateEmitter, UnsupportedUpdateEmitter} from './emitters/unsupported_output_driver';
import {VarEmitter} from './emitters/var_emitter';
import {produceBodyStatements, produceTemplateFunctionParams} from './util';

export function emitTemplateFunction(tpl: RootTemplate, constantPool: ConstantPool) {
  const createEmitters: CreateEmitter[] = [];
  const updateEmitters: UpdateEmitter[] = [];

  updateEmitters.push(
      new VarEmitter(), new TextInterpolateEmitter(), new AdvanceEmitter(),
      new UnsupportedUpdateEmitter());

  createEmitters.push(
      new ElementNodeEmitter(), new TextNodeEmitter(),
      new TemplateEmitter(createEmitters, updateEmitters, constantPool),
      new UnsupportedCreateEmitter());

  return o.fn(
      produceTemplateFunctionParams(), produceBodyStatements(tpl, createEmitters, updateEmitters),
      undefined, undefined, `${tpl.name}_Template`);
}
