import * as process from 'process';
import * as cp from 'child_process';
import * as path from 'path';
import * as fs from 'fs/promises';
import {createSegment, getSegment, updateSegment} from '../src/segments';

describe('Mock Test', () => {
  test('Mock Test', async () => {
    const readme = await getReadme();
    if (!readme) throw new Error('No readme found');

    const segment = getSegment(readme.content);
    if (segment === null) throw new Error('No segment found');

    const todo = await getTodo();
    if (!todo) throw new Error('No todo found');

    const newSegment = createSegment(todo.content);
    if (newSegment === segment) return; //no changes

    const newReadme = updateSegment(readme.content, newSegment);
    await updateReadme(newReadme);

    const expectedReadme = await fs.readFile('./__tests__/testData/README_EXPECTED.md', 'utf8');
    const expectedSegment = getSegment(expectedReadme);

    const areEqual = expectedSegment === newSegment;
    expect(areEqual).toBe(true);
  });

  const getReadme = async () => {
    //read content from ./testData
    const readme = await fs.readFile('./__tests__/testData/README.md', 'utf8');
    return {
      content: readme
    };
  };

  const getTodo = async () => {
    //read content from ./testData
    const todo = await fs.readFile('./__tests__/testData/TODO', 'utf8');
    return {
      content: todo
    };
  };

  const updateReadme = async (newReadme: string) => {
    //write content to ./testData
    await fs.writeFile('./__tests__/testData/README_NEW.md', newReadme);
  };
});

// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env['INPUT_MILLISECONDS'] = '500'
//   const np = process.execPath
//   const ip = path.join(__dirname, '..', 'lib', 'main.js')
//   const options: cp.ExecFileSyncOptions = {
//     env: process.env
//   }
//   console.log(cp.execFileSync(np, [ip], options).toString())
// })
