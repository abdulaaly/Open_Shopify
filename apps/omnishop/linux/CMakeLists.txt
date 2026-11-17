cmake_minimum_required(VERSION 3.10)
project(omnishop LANGUAGES CXX)

set(BINARY_NAME "omnishop")

cmake_policy(SET CMP0079 NEW)

# System dependencies
find_package(PkgConfig REQUIRED)
pkg_check_modules(GTK REQUIRED IMPORTED_TARGET gtk+-3.0)

# Application build configuration
add_executable(${BINARY_NAME}
  "main.cc"
  "my_application.cc"
)

target_link_libraries(${BINARY_NAME} PRIVATE PkgConfig::GTK)
target_include_directories(${BINARY_NAME} PRIVATE "${CMAKE_CURRENT_SOURCE_DIR}")
