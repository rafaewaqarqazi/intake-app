import React, { useMemo } from "react";
import { Button, Card, Divider, Flex, Form, Popover } from "antd";
import Image from "next/image";
import { Title } from "@/components/antd-sub-components";
import {
  currencyFormatter,
  getTotalDurationByAddOns,
  getTotalPrice,
} from "@/utils/helpers";
import { IPackage } from "@/utils/crud/package.crud";
import Icon, { ClockCircleOutlined } from "@ant-design/icons";
import { IAddOn } from "@/utils/crud/addOn.crud";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

const GetStartedSummary = ({ addOns }: { addOns: IAddOn[] }) => {
  const form = Form.useFormInstance();
  const _package: IPackage = Form.useWatch("package", form);
  const timeslot = Form.useWatch("timeslot", form);

  const customerAddOns: {
    [key: number]: number;
  } = Form.useWatch("customerAddOns", form);
  const totalPrice = useMemo(
    () =>
      getTotalPrice({
        addOns,
        package: _package,
        customerAddOns,
      }),
    [customerAddOns, _package, addOns],
  );
  const totalDuration = useMemo(
    () => getTotalDurationByAddOns({ customerAddOns, addOns }),
    [customerAddOns, addOns],
  );
  return (
    <div>
      <Title level={2} className="!font-semibold !mt-0 !text-4xl">
        Booking Summary
      </Title>
      <Card className="!p-1">
        <Flex gap={16} align="center" className="relative">
          <div>
            <Image
              src={_package?.image}
              alt={_package?.name}
              width={48}
              height={48}
              className="rounded-2xl"
            />
          </div>
          <div>
            <Title level={4} className="!mt-0">
              {_package?.displayName}
            </Title>
            <Title
              level={5}
              type="secondary"
              className="!mt-0 !mb-0 !font-extrabold !text-colorGrey"
            >
              {currencyFormatter.format(totalPrice)} | {totalDuration}hrs
            </Title>
          </div>
          <Popover
            content={_package?.description}
            title={_package?.displayName}
          >
            <Button
              className="!absolute top-0 right-0"
              icon={
                <Icon
                  className="!text-2xl [&_svg]:!fill-white"
                  component={InformationCircleIcon}
                />
              }
              type="text"
            />
          </Popover>
        </Flex>
        <Divider />
        {customerAddOns &&
          Object.keys(customerAddOns).map((key) => {
            const addOn = addOns?.find((a) => a.id === +key);
            const isPackageAddOn = _package?.packageAddOns?.find(
              (pa) => pa.addOn?.id === +key,
            );
            const hasQuantity = isPackageAddOn
              ? true
              : customerAddOns[+key] > 0;
            return (
              addOn &&
              hasQuantity && (
                <Flex gap={16} align="center" className="pl-10" key={key}>
                  <div>
                    <Image
                      src={addOn?.image}
                      alt={addOn?.name}
                      width={48}
                      height={48}
                      className="rounded-2xl"
                    />
                  </div>
                  <div className="flex-grow">
                    <Title level={5} className="!mt-0">
                      {addOn?.name}
                    </Title>
                  </div>
                  <div className="w-8 h-8 bg-bodyBG rounded-lg flex items-center justify-center !font-medium">
                    {customerAddOns[+key]}
                  </div>
                </Flex>
              )
            );
          })}
        <Divider />

        <Title level={5} className="!mt-0">
          <ClockCircleOutlined /> {timeslot?.date} {timeslot?.timeslot?.time}
        </Title>
      </Card>
    </div>
  );
};

export default GetStartedSummary;
