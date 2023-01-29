import React from 'react';
import { Meta, Story } from '@storybook/react';
import useCallbackAsync from "../src/useCallbackAsync";
import LoadingErrorOrData from "../src/LoadingErrorOrData";

const meta: Meta = {
  title: 'useCallbackAsync',
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const doSuccessfulThingAsync = () => new Promise<string>((resolve) => {
  setTimeout(() => {
    resolve('success result');
  }, 1000);
});

const doErrorThingAsync = () => new Promise<string>((_, reject) => {
  setTimeout(() => {
    reject(new Error('error result'));
  }, 1000);
});

const Template: Story<any> = (args) => {
  const [callback, result, loading, error] = useCallbackAsync<string>(args.callback);

  const handleClick = () => {
    callback()
        .then(res => alert(`Success! ${res}`))
        .catch(err => alert(`Error! ${err?.message}`));
  }

  return (
    <div>
      <button onClick={handleClick}>Invoke Callback</button>
      <LoadingErrorOrData
          loading={loading}
          error={error}
          data={result}
          renderData={(data) => (
              <div>Result: {data}</div>
          )}
      >
        <div>No Data</div>
      </LoadingErrorOrData>
    </div>
  )
};

export const Success = Template.bind({});

Success.args = {
  callback: doSuccessfulThingAsync
};

export const Fail = Template.bind({});

Fail.args = {
  callback: doErrorThingAsync
};
