import React from "react";
import { ContainerScroll } from "./ui/container-scroll-animation";

const Hero = () => {
    return (
        <section className="bg-gray-50">
            <div className="flex flex-col overflow-hidden">
                <ContainerScroll
                    titleComponent={
                        <>
                            <h1 className="text-4xl font-semibold text-black dark:text-white">
                                Your Financial Goals, Simplified
                                <br />
                                <span className="text-4xl md:text-[6rem] font-bold mt-1 text-purple-800 leading-none ">
                                    Budget Better. Live Freely.
                                </span>
                            </h1>
                        </>
                    }
                >
                    <image
                        src={`/dashboard.png`}
                        alt="hero"
                        height={720}
                        width={1400}
                        className="mx-auto rounded-2xl object-cover h-full object-left-top"
                        draggable={false}
                    />
                </ContainerScroll>
            </div>
        </section>
    );
};

export default Hero;
