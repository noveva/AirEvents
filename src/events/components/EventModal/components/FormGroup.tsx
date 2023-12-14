import React from 'react';
import Chips, {ChipValue, ChipValues} from './Chips';
import Label from './Label';
import Card from '../../../../common/components/Card';

type Props<T> = {
  groupId: string;
  label: string;
  options: ChipValues<T>;
  selected?: ChipValue<T>['id'];
  onPress: (value: any) => any;
};

function EventFormGroup<T>({
  groupId,
  label,
  options,
  selected,
  onPress,
}: Props<T>): React.JSX.Element {
  return (
    <Card>
      <Label text={label} nativeID={groupId} />
      <Chips
        options={options}
        selected={selected}
        labelledBy={groupId}
        onPress={onPress}
      />
    </Card>
  );
}

export default EventFormGroup;
