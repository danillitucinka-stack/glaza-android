#include <jni.h>
#include <string>

extern "C"
JNIEXPORT void JNICALL
Java_com_eyepro_MainActivity_processFrame(JNIEnv* env, jobject /* this */) {
    // Placeholder for native frame processing.
    // In a real app, you would process the camera frame here (e.g., with OpenCV).
    // For now, we do nothing to ensure the build succeeds.
}