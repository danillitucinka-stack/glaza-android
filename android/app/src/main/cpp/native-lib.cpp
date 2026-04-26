#include <jni.h>
#include <string>

extern "C"
JNIEXPORT void JNICALL
Java_com_eyepro_MainActivity_processFrame(JNIEnv* env, jobject /* this */, jlong matAddrGray, jlong matAddrRgba) {
    // Native frame processing placeholder.
    // In a real app, you would cast matAddrGray and matAddrRgba to cv::Mat* and process with OpenCV.
    // For now, we do nothing.
}