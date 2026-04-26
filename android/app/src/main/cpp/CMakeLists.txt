cmake_minimum_required(VERSION 3.4.1)

# OpenCV library - assuming you have OpenCV SDK installed via NDK or prebuilt
# For simplicity, we'll link against opencv_java4 (if using prebuilt) or build from source.
# In a real scenario, you might need to add OpenCV as a module or use prebuilt libs.
# Here we assume OpenCV is available via NDK (e.g., via OpenCV4Android SDK integrated with NDK).
# If not, you may need to adjust.

# For now, we'll create a simple native library without OpenCV to avoid complex setup.
# However, the user requested OpenCV preparation. We'll try to find OpenCV package.

# Option 1: If OpenCV is installed via NDK (experimental) or you have prebuilt libs in src/main/jniLibs/
# We'll look for OpenCV in the default NDK paths or bundled.

# Let's assume we have OpenCV prebuilt libs in ${CMAKE_SOURCE_DIR}/../../src/main/jniLibs/${ANDROID_ABI}/
# But to keep it simple, we'll just link against log and maybe a dummy.

# Actually, we can use OpenCV's CMake integration if we have the OpenCV SDK.
# Since we don't want to complicate, we'll just note that OpenCV linking is required.

# For the purpose of this task, we'll create a minimal example that compiles without OpenCV,
# and the user can later add OpenCV dependencies.

add_library( # Sets the name of the library.
             native-lib
             # Sets the library as a shared library.
             SHARED
             # Provides a relative path to your source file(s).
             native-lib.cpp )

# Find the log library.
find_library( # Sets the name of the path variable.
              log-lib
              # Specifies the name of the NDK library that
              # we want to use.
              log )

# Specifies libraries CMake should link to your target library.
target_link_libraries( # Specifies the target library.
                       native-lib
                       # Links the target library to the log library
                       # included in the NDK.
                       ${log-lib} )

# TODO: Add OpenCV linking here if needed.
# Example: target_include_directories(native-lib PRIVATE path/to/opencv/include)
#          target_link_libraries(native-lib PRIVATE path/to/opencv/lib/libopencv_java4.so)
