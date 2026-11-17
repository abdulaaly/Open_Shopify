cmake_minimum_required(VERSION 3.14)
project(runner LANGUAGES CXX)

set(BINARY_NAME "omnishop")

add_executable(${BINARY_NAME} WIN32
  "main.cpp"
  "Runner.rc"
)

apply_standard_settings(${BINARY_NAME})
target_compile_definitions(${BINARY_NAME} PRIVATE
  "_UNICODE"
  "UNICODE"
)
