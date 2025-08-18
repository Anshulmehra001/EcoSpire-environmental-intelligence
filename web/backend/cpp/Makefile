# Aqua-Lens C++ Image Processor Makefile

CXX = g++
CXXFLAGS = -std=c++11 -O3 -Wall -Wextra
TARGET = image_processor
SOURCE = image_processor.cpp

# Try to detect OpenCV installation
OPENCV_VERSION := $(shell pkg-config --exists opencv4 && echo "opencv4" || echo "opencv")
OPENCV_CFLAGS := $(shell pkg-config --cflags $(OPENCV_VERSION) 2>/dev/null)
OPENCV_LIBS := $(shell pkg-config --libs $(OPENCV_VERSION) 2>/dev/null)

# Fallback if pkg-config doesn't work
ifeq ($(OPENCV_LIBS),)
    OPENCV_LIBS = -lopencv_core -lopencv_imgproc -lopencv_imgcodecs
endif

# Build target
$(TARGET): $(SOURCE)
	@echo "Building Aqua-Lens Image Processor..."
	@echo "OpenCV Version: $(OPENCV_VERSION)"
	$(CXX) $(CXXFLAGS) $(OPENCV_CFLAGS) -o $(TARGET) $(SOURCE) $(OPENCV_LIBS)
	@echo "Build complete: $(TARGET)"

# Clean target
clean:
	rm -f $(TARGET)
	@echo "Cleaned build files"

# Install dependencies (Ubuntu/Debian)
install-deps-ubuntu:
	sudo apt-get update
	sudo apt-get install -y build-essential cmake pkg-config
	sudo apt-get install -y libopencv-dev libopencv-contrib-dev

# Install dependencies (macOS with Homebrew)
install-deps-macos:
	brew install opencv pkg-config

# Install dependencies (Windows with vcpkg)
install-deps-windows:
	@echo "For Windows, install OpenCV using vcpkg:"
	@echo "vcpkg install opencv[contrib]:x64-windows"
	@echo "Then compile with: make windows"

# Windows build (requires vcpkg)
windows:
	$(CXX) $(CXXFLAGS) -I"$(VCPKG_ROOT)/installed/x64-windows/include" \
		-L"$(VCPKG_ROOT)/installed/x64-windows/lib" \
		-o $(TARGET).exe $(SOURCE) \
		-lopencv_core -lopencv_imgproc -lopencv_imgcodecs

# Test the processor
test: $(TARGET)
	@echo "Testing image processor..."
	@if [ -f "test_image.jpg" ]; then \
		./$(TARGET) test_image.jpg test_output.jpg; \
	else \
		echo "No test image found. Place a test image as 'test_image.jpg' to test."; \
	fi

# Help
help:
	@echo "Aqua-Lens C++ Image Processor Build System"
	@echo ""
	@echo "Targets:"
	@echo "  $(TARGET)           - Build the image processor"
	@echo "  clean              - Remove build files"
	@echo "  test               - Test the processor with test_image.jpg"
	@echo "  install-deps-ubuntu - Install dependencies on Ubuntu/Debian"
	@echo "  install-deps-macos  - Install dependencies on macOS"
	@echo "  install-deps-windows - Show Windows installation instructions"
	@echo "  windows            - Build for Windows (requires vcpkg)"
	@echo "  help               - Show this help message"
	@echo ""
	@echo "Usage:"
	@echo "  ./$(TARGET) <input_image> <output_image>"

.PHONY: clean install-deps-ubuntu install-deps-macos install-deps-windows windows test help