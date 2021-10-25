import React from 'react';
import { mount } from 'enzyme';
import mountTest from '../../../tests/mountTest';
import { Button, Form, Input, Radio } from '../..';
import { FormProps } from '../interface';

mountTest(Form);

function mountForm(component: React.ReactElement) {
  return mount<typeof Form, React.PropsWithChildren<FormProps>>(component);
}

describe('setFieldsValue for shouldUpdate items', () => {
  it('basic form', () => {
    let formRef;
    let changeValue;

    const wrapper = mountForm(
      <div>
        <Button
          type="primary"
          onClick={() =>
            formRef.setFieldsValue({
              type: 'B',
              field1: 'setValue',
              field2: { field2: 'setValue' },
              'field3.field': 'a',
            })
          }
          className="form-button"
        >
          click to setFieldsValue
        </Button>
        <Form
          ref={(node) => {
            formRef = node;
          }}
          onValuesChange={(v) => {
            changeValue = v;
          }}
          style={{ maxWidth: 650 }}
        >
          <Form.Item field="type" label="Type">
            <Radio.Group options={['A', 'B']} />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {(values) => {
              return (
                values.type === 'B' && (
                  <Form.Item
                    field="field1"
                    label="field1"
                    initialValue="initialValue"
                    extra="as expected"
                  >
                    <Input />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {(values) => {
              return (
                values.type === 'B' && (
                  <Form.Item
                    field="field2.field2"
                    label="field2.field2"
                    initialValue="initialValue"
                    extra="wrong"
                  >
                    <Input />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
          <Form.Item noStyle shouldUpdate>
            {(values) => {
              return (
                values.type === 'B' && (
                  <Form.Item
                    field="field3.field"
                    label="field3.field"
                    initialValue="initialValue"
                    extra="wrong"
                  >
                    <Input />
                  </Form.Item>
                )
              );
            }}
          </Form.Item>
        </Form>
      </div>
    );

    const button = wrapper.find('.form-button').at(0);
    button.simulate('click');

    expect(formRef.getFieldsValue()).toEqual({
      type: 'B',
      field1: 'setValue',
      field2: { field2: 'setValue' },
      field3: { field: 'a' },
    });
    expect(changeValue).toEqual({
      type: 'B',
      field1: 'setValue',
      field2: { field2: 'setValue' },
      'field3.field': 'a',
    });
  });
});
