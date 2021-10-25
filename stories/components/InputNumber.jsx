import React, { useEffect, useState } from 'react';
import { InputNumber, Button } from '@self';

export default function() {
  const [value, setValue] = useState(5);
  return (
    <div>
      <Button onClick={() => setValue(value + 10)}>Add</Button>
      <InputNumber mode="button" value={value} onChange={setValue} />
    </div>
  );
}
