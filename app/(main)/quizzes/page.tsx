"use client";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { QuizCategory } from "@/lib/QuizLibrary/QuizLib";
import { ArrowRight, Search, Timer } from "lucide-react";
import React, { useEffect, useState } from "react";

const Quizzes = () => {
  type QuizCategoryType = {
    id: string;
    icon: string;
    title: string;
    category: string;
    color: string;
    quizzes: Quiz[];
  };

  type Quiz = {
    id: string;
    title: string;
    questionCount: number;
    prompt: string;
  };

  const [search, setSearch] = useState(""); // user's real-time input
  const debouncedSearch = useDebounce(search, 500); // debounce it
  const [filteredQuizzes, setFilteredQuizzes] = useState(QuizCategory);

  const fetchQuizzes = () => {
    if (!debouncedSearch.trim()) {
      setFilteredQuizzes(QuizCategory);
      return;
    }

    const filtered = QuizCategory.filter(
      (category) =>
        category.category
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase()) ||
        category.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

    setFilteredQuizzes(filtered);
  };

  useEffect(() => {
    fetchQuizzes();
  }, [debouncedSearch]);

  return (
    <div className="lg:p-16 px-2 py-4 ">
      <div className="text-center">
        <h1 className="text-3xl tracking-wider bg-gradient-to-b from-[#4382BE] to-[#45B4A6] text-transparent bg-clip-text">
          Quiz Categories
        </h1>
        <div className="flex justify-center  items-center  mt-4  ">
          <div className="flex  items-center justify-center text-center border-2 border-[#b2ede5] rounded-full py-1 px-6 bg-white ">
            <Search className="text-gray-500" />
            <Input
              type="text"
              placeholder="Search quizzes"
              className="!border-none !ring-0 !outline-none !focus:outline-none !focus:ring-0 !focus-visible:outline-none !shadow-none bg-transparent text-sm text-gray-700  placeholder:text-gray-400"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div>
        {search ? (
          <div>
            {filteredQuizzes.length > 0 ? (
              <div>
                <div className="mt-10">
                  <div className="flex flex-col ">
                    {filteredQuizzes.map(
                      (item: QuizCategoryType, index: number) => (
                        <div key={index} className={`p-8 `}>
                          <div>
                            <div className="flex items-center gap-1">
                              <h1 className="text-2xl">{item.icon}</h1>
                              <h1 className="text-2xl py-2">{item.title}</h1>
                            </div>
                            <h3 className="text-sm text-gray-500">
                              {item.category}
                            </h3>
                            <hr className="" />
                          </div>
                          <div>
                            <div className="py-6 lg:px-8  grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
                              {item.quizzes.map((it: Quiz, ind: number) => (
                                <div
                                  key={ind}
                                  className="group relative px-6 py-5 bg-gradient-to-br from-[#4382BE] to-[#45B4A6] text-white rounded-md shadow-md hover:shadow-lg hover:from-[#325352] hover:to-[#1f3a39] transition-all duration-300 cursor-pointer overflow-hidden"
                                >
                                  {/* Decorative Arrow on Hover */}
                                  <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-xl group-hover:translate-x-0 ">
                                    <ArrowRight />
                                  </div>

                                  <div className="flex flex-col gap-3">
                                    <h3 className="text-lg font-semibold">
                                      {it.title}
                                    </h3>
                                    <p className="text-sm text-gray-300">
                                      {it.questionCount} questions
                                    </p>
                                    <div className="flex items-center gap-1 text-gray-300">
                                      <Timer
                                        className="text-gray-300"
                                        size={18}
                                      />
                                      <p className="text-sm">5 Mins</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-center text-xl text-gray-500 mt-10">
                  No quizzes found for "{search}"
                </h2>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mt-10">
              <div className="flex flex-col ">
                {QuizCategory.map((item: QuizCategoryType, index: number) => (
                  <div key={index} className={`p-8 `}>
                    <div>
                      <div className="flex items-center gap-1">
                        <h1 className="text-2xl">{item.icon}</h1>
                        <h1 className="text-2xl py-2">{item.title}</h1>
                      </div>
                      <h3 className="text-sm text-gray-500">{item.category}</h3>
                      <hr className="" />
                    </div>
                    <div>
                      <div className="py-6 lg:px-8  grid lg:grid-cols-3 xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4 ">
                        {item.quizzes.map((it: Quiz, ind: number) => (
                          <div
                            key={ind}
                            className="group relative px-6 py-5 bg-gradient-to-br from-[#4382BE] to-[#45B4A6] text-white rounded-md shadow-md hover:shadow-lg hover:from-[#325352] hover:to-[#1f3a39] transition-all duration-300 cursor-pointer overflow-hidden"
                          >
                            {/* Decorative Arrow on Hover */}
                            <div className="absolute top-1/2 right-4 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-xl group-hover:translate-x-0 ">
                              <ArrowRight />
                            </div>

                            <div className="flex flex-col gap-3">
                              <h3 className="text-lg font-semibold">
                                {it.title}
                              </h3>
                              <p className="text-sm text-gray-300">
                                {it.questionCount} questions
                              </p>
                              <div className="flex items-center gap-1 text-gray-300">
                                <Timer className="text-gray-300" size={18} />
                                <p className="text-sm">5 Mins</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
