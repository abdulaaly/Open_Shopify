cmake_minimum_required(VERSION 3.14)
project(vendr_omni_app LANGUAGES CXX)

set(BINARY_NAME "vendr_omni_app")

cmake_policy(SET CMP0079 NEW)

# Flutter CMake build configuration
set(FLUTTER_MANAGED_DIR "${CMAKE_CURRENT_SOURCE_DIR}/flutter")

# Application build configuration
add_subdirectory("runner")
