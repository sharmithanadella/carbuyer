import React, { useState } from "react";
import Image from "next/image";
import { Combobox, Transition } from "@headlessui/react";
import { manufacturers } from "@constants";
import CustomButton from "./CustomButton";
import CarDetails from "./CarDetails";

const Combined = ({ car }) => {
  const { city_mpg, year, make, model, transmission, drive } = car;

  const [isOpen, setIsOpen] = useState(false);
  const [manufacturer, setManufacturer] = useState("");
  const [query, setQuery] = useState("");

  const carRent = calculateCarRent(city_mpg, year);

  const handleInterestedClick = () => {
    
    alert(`Interested in contacting the owner of ${make} ${model}`);
  };

  const filteredManufacturers =
    query === ""
      ? manufacturers
      : manufacturers.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="combined-container">
      <div className="search-manufacturer">
        <Combobox value={manufacturer} onChange={setManufacturer}>
          <div className="relative w-full">
            <Combobox.Button className="absolute top-[14px]">
              <Image
                src="/car-logo.svg"
                width={20}
                height={20}
                className="ml-4"
                alt="car logo"
              />
            </Combobox.Button>

            <Combobox.Input
              className="search-manufacturer__input"
              displayValue={(item) => item}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Volkswagen..."
            />

            <Transition
              as={React.Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options
                className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                static
              >
                {filteredManufacturers.length === 0 && query !== "" ? (
                  <Combobox.Option
                    value={query}
                    className="search-manufacturer__option"
                  >
                    Create "{query}"
                  </Combobox.Option>
                ) : (
                  filteredManufacturers.map((item) => (
                    <Combobox.Option
                      key={item}
                      className={({ active }) =>
                        `relative search-manufacturer__option ${
                          active ? "bg-primary-blue text-white" : "text-gray-900"
                        }`
                      }
                      value={item}
                    >
                      {({ selected, active }) => (
                        <>
                          <span className={`block truncate ${selected ? "font-medium" : "font-normal"}`}>
                            {item}
                          </span>

                          {selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : "text-primary-purple"}`}
                            ></span>
                          ) : null}
                        </>
                      )}
                    </Combobox.Option>
                  ))
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </Combobox>
      </div>

      <div className="car-card group">
        <div className="car-card__content">
          <h2 className="car-card__content-title">
            {make} {model}
          </h2>
        </div>

        <p className="flex mt-6 text-[32px] leading-[38px] font-extrabold">
          <span className="self-start text-[14px] leading-[17px] font-semibold">$</span>
          {carRent}
          <span className="self-end text-[14px] leading-[17px] font-medium">/day</span>
        </p>

        <div className="relative w-full h-40 my-3 object-contain">
          <Image src={generateCarImageUrl(car)} alt="car model" fill priority className="object-contain" />
        </div>

        <div className="relative flex w-full mt-2">
          <div className="flex group-hover:invisible w-full justify-between text-grey">
            <div className="flex flex-col justify-center items-center gap-2">
              <Image src="/steering-wheel.svg" width={20} height={20} alt="steering wheel" />
              <p className="text-[14px] leading-[17px]">
                {transmission === "a" ? "Automatic" : "Manual"}
              </p>
            </div>
            <div className="car-card__icon">
              <Image src="/tire.svg" width={20} height={20} alt="seat" />
              <p className="car-card__icon-text">{drive.toUpperCase()}</p>
            </div>
            <div className="car-card__icon">
              <Image src="/gas.svg" width={20} height={20} alt="seat" />
              <p className="car-card__icon-text">{city_mpg} MPG</p>
            </div>
          </div>

          <div className="car-card__btn-container">
            <CustomButton
              title="View More"
              containerStyles="w-full py-[16px] rounded-full bg-primary-blue"
              textStyles="text-white text-[14px] leading-[17px] font-bold"
              rightIcon="/right-arrow.svg"
              handleClick={() => setIsOpen(true)}
            />
          </div>
        </div>

        <CarDetails isOpen={isOpen} closeModal={() => setIsOpen(false)} car={car} />
      </div>

      <InterestedBox ownerDetails={manufacturer} onInterestedClick={handleInterestedClick} />
    </div>
  );
};

export default Combined;
