// ****************************************************************
// NOTE:
// Every change to this file should be tracked here so that we know
// the exact status relative to the upstream spec (except bugfixes
// that bring the file in-line with this tracking).
// ****************************************************************
//
// This revision of the types is based on:
// https://github.com/gpuweb/gpuweb/blob/38236513beaf98e1579b212c0df6f33bd19691ab/spec/index.bs
// - except #494: reverted the addition of GPUAdapter.limits
// - except #591: removed Uint32Array from GPUShaderModuleDescriptor
// - except removal of old setIndexBuffer signature in #943
// - plus #873: added aspect back to GPUTextureCopyView
// - plus #971: added stencil8 to GPUTextureFormat
// - plus #1168: renamed OUTPUT_ATTACHMENT to RENDER_ATTACHMENT
// - plus #1367: renamed defaultQueue to queue
// - plus #1014: made bytesPerRow optional
// - plus #1375: renamed to GPUImageCopyX (but without removing old names)
// - plus #1390: renamed depth to depthOrArrayLayers
// - plus #1152+#1441: made height/depthOrArrayLayers optional
// - plus #1328: add texture dimension limits
// - plus #1322+#1469: rename vertex formats
// - plus #1352: refactor GPURenderPipelineDescriptor
// - plus #1185: update getSwapChainPreferredFormat
// - plus #1336: createReady*Pipeline -> create*PipelineAsync

declare global {

  // *********************************************************************************************
  // Manually-written
  // *********************************************************************************************

  interface HTMLCanvasElement {
    getContext(contextId: "gpupresent"): GPUCanvasContext | null;
  }
  interface OffscreenCanvas {
    getContext(contextId: "gpupresent"): GPUCanvasContext | null;
  }

  // *********************************************************************************************
  // Semi-auto-generated (by manual diff with autogenerated types)
  // *********************************************************************************************

  interface GPUObjectBase {
    label: string | undefined;
  }
  interface GPUObjectDescriptorBase {
    label?: string;
  }
  interface GPULimits {
    maxTextureDimension1D?: number;
    maxTextureDimension2D?: number;
    maxTextureDimension3D?: number;
    maxTextureArrayLayers?: number;
    maxBindGroups?: number;
    maxDynamicUniformBuffersPerPipelineLayout?: number;
    maxDynamicStorageBuffersPerPipelineLayout?: number;
    maxSampledTexturesPerShaderStage?: number;
    maxSamplersPerShaderStage?: number;
    maxStorageBuffersPerShaderStage?: number;
    maxStorageTexturesPerShaderStage?: number;
    maxUniformBuffersPerShaderStage?: number;
    maxUniformBufferBindingSize?: number;
  }
  interface Navigator {
    readonly gpu: GPU | undefined;
  }
  class GPU {
    private __brand: void;
    requestAdapter(
      options?: GPURequestAdapterOptions
    ): Promise<GPUAdapter | null>;
  }
  interface GPURequestAdapterOptions {
    powerPreference?: GPUPowerPreference;
  }
  type GPUPowerPreference = "low-power" | "high-performance";
  class GPUAdapter {
    // https://michalzalecki.com/nominal-typing-in-typescript/#approach-1-class-with-a-private-property
    private __brand: void;
    readonly name: string;
    readonly extensions: GPUExtensionName[];
    readonly limits: Required<GPULimits>;
    requestDevice(descriptor?: GPUDeviceDescriptor): Promise<GPUDevice | null>;
  }
  interface GPUDeviceDescriptor extends GPUObjectDescriptorBase {
    extensions?: Iterable<GPUExtensionName>;
    limits?: GPULimits;
  }
  type GPUExtensionName =
    | "depth-clamping"
    | "depth24unorm-stencil8"
    | "depth32float-stencil8"
    | "pipeline-statistics-query"
    | "texture-compression-bc"
    | "timestamp-query";
  class GPUDevice extends EventTarget implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    readonly adapter: GPUAdapter;
    readonly extensions: GPUExtensionName[];
    readonly limits: Required<GPULimits>;
    createBindGroup(descriptor: GPUBindGroupDescriptor): GPUBindGroup;
    createBindGroupLayout(
      descriptor: GPUBindGroupLayoutDescriptor
    ): GPUBindGroupLayout;
    createBuffer(descriptor: GPUBufferDescriptor): GPUBuffer;
    createPipelineLayout(
      descriptor: GPUPipelineLayoutDescriptor
    ): GPUPipelineLayout;
    createSampler(descriptor?: GPUSamplerDescriptor): GPUSampler;
    createShaderModule(descriptor: GPUShaderModuleDescriptor): GPUShaderModule;
    createTexture(descriptor: GPUTextureDescriptor): GPUTexture;
    createComputePipeline(
      descriptor: GPUComputePipelineDescriptor
    ): GPUComputePipeline;
    createRenderPipeline(
      descriptor: GPURenderPipelineDescriptor
    ): GPURenderPipeline;
    createComputePipelineAsync(
      descriptor: GPUComputePipelineDescriptor
    ): Promise<GPUComputePipeline>;
    /** @deprecated */
    createReadyComputePipeline(
      descriptor: GPUComputePipelineDescriptor
    ): Promise<GPUComputePipeline>;
    createRenderPipelineAsync(
      descriptor: GPURenderPipelineDescriptor
    ): Promise<GPURenderPipeline>;
    /** @deprecated */
    createReadyRenderPipeline(
      descriptor: GPURenderPipelineDescriptor
    ): Promise<GPURenderPipeline>;
    createCommandEncoder(
      descriptor?: GPUCommandEncoderDescriptor
    ): GPUCommandEncoder;
    createRenderBundleEncoder(
      descriptor: GPURenderBundleEncoderDescriptor
    ): GPURenderBundleEncoder;
    createQuerySet(descriptor: GPUQuerySetDescriptor): GPUQuerySet;
    queue: GPUQueue;
    pushErrorScope(filter: GPUErrorFilter): undefined;
    popErrorScope(): Promise<GPUError | null>;
    onuncapturederror: Event | undefined;
    readonly lost: Promise<GPUDeviceLostInfo>;
  }
  class GPUBuffer implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    destroy(): undefined;
    unmap(): undefined;
    mapAsync(
      mode: GPUMapModeFlags,
      offset?: number,
      size?: number
    ): Promise<undefined>;
    getMappedRange(offset?: number, size?: number): ArrayBuffer;
  }
  interface GPUBufferDescriptor extends GPUObjectDescriptorBase {
    size: number;
    usage: GPUBufferUsageFlags;
    mappedAtCreation?: boolean;
  }
  type GPUBufferUsageFlags = number;
  const GPUBufferUsage: {
    MAP_READ: 0x0001;
    MAP_WRITE: 0x0002;
    COPY_SRC: 0x0004;
    COPY_DST: 0x0008;
    INDEX: 0x0010;
    VERTEX: 0x0020;
    UNIFORM: 0x0040;
    STORAGE: 0x0080;
    INDIRECT: 0x0100;
    QUERY_RESOLVE: 0x0200;
  };
  type GPUMapModeFlags = number;
  const GPUMapMode: {
    READ: 0x1;
    WRITE: 0x2;
  };
  class GPUTexture implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    createView(descriptor?: GPUTextureViewDescriptor): GPUTextureView;
    destroy(): undefined;
  }
  interface GPUTextureDescriptor extends GPUObjectDescriptorBase {
    size: GPUExtent3DStrict;
    mipLevelCount?: number;
    sampleCount?: number;
    dimension?: GPUTextureDimension;
    format: GPUTextureFormat;
    usage: GPUTextureUsageFlags;
  }
  type GPUTextureDimension = "1d" | "2d" | "3d";
  type GPUTextureUsageFlags = number;
  const GPUTextureUsage: {
    COPY_SRC: 0x01;
    COPY_DST: 0x02;
    SAMPLED: 0x04;
    STORAGE: 0x08;
    RENDER_ATTACHMENT: 0x10;
  };
  class GPUTextureView implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
  }
  interface GPUTextureViewDescriptor extends GPUObjectDescriptorBase {
    format?: GPUTextureFormat;
    dimension?: GPUTextureViewDimension;
    aspect?: GPUTextureAspect;
    baseArrayLayer?: number;
    baseMipLevel?: number;
    arrayLayerCount?: number;
    mipLevelCount?: number;
  }
  type GPUTextureViewDimension =
    | "1d"
    | "2d"
    | "2d-array"
    | "cube"
    | "cube-array"
    | "3d";
  type GPUTextureAspect = "all" | "stencil-only" | "depth-only";
  type GPUTextureFormat =
    | "r8unorm"
    | "r8snorm"
    | "r8uint"
    | "r8sint"
    | "r16uint"
    | "r16sint"
    | "r16float"
    | "rg8unorm"
    | "rg8snorm"
    | "rg8uint"
    | "rg8sint"
    | "r32uint"
    | "r32sint"
    | "r32float"
    | "rg16uint"
    | "rg16sint"
    | "rg16float"
    | "rgba8unorm"
    | "rgba8unorm-srgb"
    | "rgba8snorm"
    | "rgba8uint"
    | "rgba8sint"
    | "bgra8unorm"
    | "bgra8unorm-srgb"
    | "rgb9e5ufloat"
    | "rgb10a2unorm"
    | "rg11b10ufloat"
    | "rg32uint"
    | "rg32sint"
    | "rg32float"
    | "rgba16uint"
    | "rgba16sint"
    | "rgba16float"
    | "rgba32uint"
    | "rgba32sint"
    | "rgba32float"
    | "stencil8"
    | "depth16unorm"
    | "depth24plus"
    | "depth24plus-stencil8"
    | "depth32float"
    | "bc1-rgba-unorm"
    | "bc1-rgba-unorm-srgb"
    | "bc2-rgba-unorm"
    | "bc2-rgba-unorm-srgb"
    | "bc3-rgba-unorm"
    | "bc3-rgba-unorm-srgb"
    | "bc4-r-unorm"
    | "bc4-r-snorm"
    | "bc5-rg-unorm"
    | "bc5-rg-snorm"
    | "bc6h-rgb-ufloat"
    | "bc6h-rgb-float"
    | "bc7-rgba-unorm"
    | "bc7-rgba-unorm-srgb"
    | "depth24unorm-stencil8"
    | "depth32float-stencil8";
  class GPUSampler implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
  }
  interface GPUSamplerDescriptor extends GPUObjectDescriptorBase {
    addressModeU?: GPUAddressMode;
    addressModeV?: GPUAddressMode;
    addressModeW?: GPUAddressMode;
    magFilter?: GPUFilterMode;
    minFilter?: GPUFilterMode;
    mipmapFilter?: GPUFilterMode;
    lodMinClamp?: number;
    lodMaxClamp?: number;
    compare?: GPUCompareFunction;
    maxAnisotropy?: number;
  }
  type GPUAddressMode = "clamp-to-edge" | "repeat" | "mirror-repeat";
  type GPUFilterMode = "nearest" | "linear";
  type GPUCompareFunction =
    | "never"
    | "less"
    | "equal"
    | "less-equal"
    | "greater"
    | "not-equal"
    | "greater-equal"
    | "always";
  class GPUBindGroupLayout implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
  }
  interface GPUBindGroupLayoutDescriptor extends GPUObjectDescriptorBase {
    entries: Iterable<GPUBindGroupLayoutEntry>;
  }
  type GPUShaderStageFlags = number;
  const GPUShaderStage: {
    VERTEX: 0x1;
    FRAGMENT: 0x2;
    COMPUTE: 0x4;
  };
  interface GPUBindGroupLayoutEntry {
    binding: number;
    visibility: GPUShaderStageFlags;
    buffer?: GPUBufferBindingLayout;
    sampler?: GPUSamplerBindingLayout;
    texture?: GPUTextureBindingLayout;
    storageTexture?: GPUStorageTextureBindingLayout;
    /** @deprecated */
    type?: GPUBindingType;
    /** @deprecated */
    hasDynamicOffset?: boolean;
    /** @deprecated */
    minBufferBindingSize?: number;
    /** @deprecated */
    viewDimension?: GPUTextureViewDimension;
    /** @deprecated */
    textureComponentType?: GPUTextureComponentType;
    /** @deprecated */
    storageTextureFormat?: GPUTextureFormat;
  }
  type GPUBufferBindingType = "uniform" | "storage" | "read-only-storage";
  interface GPUBufferBindingLayout {
    type?: GPUBufferBindingType;
    hasDynamicOffset?: boolean;
    minBindingSize?: number;
  }
  type GPUSamplerBindingType = "filtering" | "non-filtering" | "comparison";
  interface GPUSamplerBindingLayout {
    type?: GPUSamplerBindingType;
  }
  type GPUTextureSampleType =
    | "float"
    | "unfilterable-float"
    | "depth"
    | "sint"
    | "uint";
  interface GPUTextureBindingLayout {
    sampleType?: GPUTextureSampleType;
    viewDimension?: GPUTextureViewDimension;
    multisampled?: boolean;
  }
  type GPUStorageTextureAccess = "read-only" | "write-only";
  interface GPUStorageTextureBindingLayout {
    access: GPUStorageTextureAccess;
    format: GPUTextureFormat;
    viewDimension?: GPUTextureViewDimension;
  }
  class GPUBindGroup implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
  }
  interface GPUBindGroupDescriptor extends GPUObjectDescriptorBase {
    layout: GPUBindGroupLayout;
    entries: Iterable<GPUBindGroupEntry>;
  }
  type GPUBindingResource = GPUSampler | GPUTextureView | GPUBufferBinding;
  interface GPUBindGroupEntry {
    binding: number;
    resource: GPUBindingResource;
  }
  interface GPUBufferBinding {
    buffer: GPUBuffer;
    offset?: number;
    size?: number;
  }
  class GPUPipelineLayout implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
  }
  interface GPUPipelineLayoutDescriptor extends GPUObjectDescriptorBase {
    bindGroupLayouts: Iterable<GPUBindGroupLayout>;
  }
  type GPUCompilationMessageType = "error" | "warning" | "info";
  class GPUCompilationMessage {
    private __brand: void;
    readonly message: string;
    readonly type: GPUCompilationMessageType;
    readonly lineNum: number;
    readonly linePos: number;
  }
  class GPUCompilationInfo {
    private __brand: void;
    readonly messages: readonly GPUCompilationMessage[];
  }
  class GPUShaderModule implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    compilationInfo(): Promise<GPUCompilationInfo>;
  }
  interface GPUShaderModuleDescriptor extends GPUObjectDescriptorBase {
    code: Uint32Array | string;
    label?: string;
    sourceMap?: object;
  }
  interface GPUPipelineDescriptorBase {
    label?: string;
    layout?: GPUPipelineLayout;
  }
  interface GPUPipelineBase extends GPUObjectBase {
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }
  /** @deprecated */
  type GPUProgrammableStageDescriptor = GPUProgrammableStage;
  interface GPUProgrammableStage {
    module: GPUShaderModule;
    entryPoint: string;
  }
  class GPUComputePipeline implements GPUPipelineBase {
    private __brand: void;
    label: string | undefined;
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }
  interface GPUComputePipelineDescriptor extends GPUPipelineDescriptorBase {
    computeStage: GPUProgrammableStage;
  }
  class GPURenderPipeline implements GPUPipelineBase {
    private __brand: void;
    label: string | undefined;
    getBindGroupLayout(index: number): GPUBindGroupLayout;
  }
  type GPURenderPipelineDescriptor =
    | GPURenderPipelineDescriptorNew
    | GPURenderPipelineDescriptorOld;
  interface GPURenderPipelineDescriptorNew extends GPUPipelineDescriptorBase {
    vertex: GPUVertexState;
    primitive?: GPUPrimitiveState;
    depthStencil?: GPUDepthStencilState;
    multisample?: GPUMultisampleState;
    fragment?: GPUFragmentState;
  }
  /** @deprecated use GPURenderPipelineDescriptor instead */
  interface GPURenderPipelineDescriptorOld extends GPUPipelineDescriptorBase {
    /** @deprecated */
    vertexStage?: GPUProgrammableStageDescriptor;
    /** @deprecated */
    fragmentStage?: GPUProgrammableStageDescriptor;
    /** @deprecated */
    primitiveTopology?: GPUPrimitiveTopology;
    /** @deprecated */
    rasterizationState?: GPURasterizationStateDescriptor;
    /** @deprecated */
    colorStates?: Iterable<GPUColorStateDescriptor>;
    /** @deprecated */
    depthStencilState?: GPUDepthStencilStateDescriptor;
    /** @deprecated */
    vertexState?: GPUVertexStateDescriptor;
    /** @deprecated */
    sampleCount?: number;
    /** @deprecated */
    sampleMask?: number;
    /** @deprecated */
    alphaToCoverageEnabled?: boolean;
  }
  type GPUPrimitiveTopology =
    | "point-list"
    | "line-list"
    | "line-strip"
    | "triangle-list"
    | "triangle-strip";
  interface GPUPrimitiveState {
    topology?: GPUPrimitiveTopology;
    stripIndexFormat?: GPUIndexFormat;
    frontFace?: GPUFrontFace;
    cullMode?: GPUCullMode;
  }
  type GPUFrontFace = "ccw" | "cw";
  type GPUCullMode = "none" | "front" | "back";
  interface GPUMultisampleState {
    count?: number;
    mask?: number;
    alphaToCoverageEnabled?: boolean;
  }
  interface GPUFragmentState extends GPUProgrammableStage {
    targets: Iterable<GPUColorTargetState>;
  }
  interface GPUColorTargetState {
    format: GPUTextureFormat;
    blend?: GPUBlendState;
    writeMask?: GPUColorWriteFlags;
  }
  interface GPUBlendState {
    color: GPUBlendComponent;
    alpha: GPUBlendComponent;
  }
  type GPUColorWriteFlags = number;
  const GPUColorWrite: {
    RED: 0x1;
    GREEN: 0x2;
    BLUE: 0x4;
    ALPHA: 0x8;
    ALL: 0xf;
  };
  interface GPUBlendComponent {
    dstFactor?: GPUBlendFactor;
    operation?: GPUBlendOperation;
    srcFactor?: GPUBlendFactor;
  }
  type GPUBlendFactor =
    | "zero"
    | "one"
    | "src-color"
    | "one-minus-src-color"
    | "src-alpha"
    | "one-minus-src-alpha"
    | "dst-color"
    | "one-minus-dst-color"
    | "dst-alpha"
    | "one-minus-dst-alpha"
    | "src-alpha-saturated"
    | "blend-color"
    | "one-minus-blend-color";
  type GPUBlendOperation =
    | "add"
    | "subtract"
    | "reverse-subtract"
    | "min"
    | "max";
  interface GPUDepthStencilState {
    format: GPUTextureFormat;
    depthWriteEnabled?: boolean;
    depthCompare?: GPUCompareFunction;
    stencilFront?: GPUStencilFaceState;
    stencilBack?: GPUStencilFaceState;
    stencilReadMask?: number;
    stencilWriteMask?: number;
    depthBias?: number;
    depthBiasSlopeScale?: number;
    depthBiasClamp?: number;
    clampDepth?: boolean;
  }
  interface GPUStencilFaceState {
    compare?: GPUCompareFunction;
    depthFailOp?: GPUStencilOperation;
    passOp?: GPUStencilOperation;
    failOp?: GPUStencilOperation;
  }
  type GPUStencilOperation =
    | "keep"
    | "zero"
    | "replace"
    | "invert"
    | "increment-clamp"
    | "decrement-clamp"
    | "increment-wrap"
    | "decrement-wrap";
  type GPUIndexFormat = "uint16" | "uint32";
  type GPUVertexFormat =
    | "uint8x2"
    | "uint8x4"
    | "sint8x2"
    | "sint8x4"
    | "unorm8x2"
    | "unorm8x4"
    | "snorm8x2"
    | "snorm8x4"
    | "uint16x2"
    | "uint16x4"
    | "sint16x2"
    | "sint16x4"
    | "unorm16x2"
    | "unorm16x4"
    | "snorm16x2"
    | "snorm16x4"
    | "float16x2"
    | "float16x4"
    | "float32"
    | "float32x2"
    | "float32x3"
    | "float32x4"
    | "uint32"
    | "uint32x2"
    | "uint32x3"
    | "uint32x4"
    | "sint32"
    | "sint32x2"
    | "sint32x3"
    | "sint32x4";
  type GPUInputStepMode = "vertex" | "instance";
  interface GPUVertexState extends GPUProgrammableStage {
    buffers?: Iterable<GPUVertexBufferLayout>;
  }
  /** @deprecated */
  type GPUVertexBufferLayoutDescriptor = GPUVertexBufferLayout;
  interface GPUVertexBufferLayout {
    arrayStride: number;
    stepMode?: GPUInputStepMode;
    attributes: Iterable<GPUVertexAttribute>;
  }
  /** @deprecated */
  type GPUVertexAttributeDescriptor = GPUVertexAttribute;
  interface GPUVertexAttribute {
    format: GPUVertexFormat;
    offset: number;
    shaderLocation: number;
  }
  class GPUCommandBuffer implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    readonly executionTime: Promise<number>;
  }
  interface GPUCommandBufferDescriptor extends GPUObjectDescriptorBase {}
  class GPUCommandEncoder implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    beginComputePass(
      descriptor?: GPUComputePassDescriptor
    ): GPUComputePassEncoder;
    beginRenderPass(descriptor: GPURenderPassDescriptor): GPURenderPassEncoder;
    copyBufferToBuffer(
      source: GPUBuffer,
      sourceOffset: number,
      destination: GPUBuffer,
      destinationOffset: number,
      size: number
    ): undefined;
    copyBufferToTexture(
      source: GPUImageCopyBuffer,
      destination: GPUImageCopyTexture,
      copySize: GPUExtent3DStrict
    ): undefined;
    copyTextureToBuffer(
      source: GPUImageCopyTexture,
      destination: GPUImageCopyBuffer,
      copySize: GPUExtent3DStrict
    ): undefined;
    copyTextureToTexture(
      source: GPUImageCopyTexture,
      destination: GPUImageCopyTexture,
      copySize: GPUExtent3DStrict
    ): undefined;
    finish(descriptor?: GPUCommandBufferDescriptor): GPUCommandBuffer;
    resolveQuerySet(
      querySet: GPUQuerySet,
      firstQuery: number,
      queryCount: number,
      destination: GPUBuffer,
      destinationOffset: number
    ): undefined;
    writeTimestamp(querySet: GPUQuerySet, queryIndex: number): undefined;
    popDebugGroup(): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    insertDebugMarker(markerLabel: string): undefined;
  }
  interface GPUCommandEncoderDescriptor extends GPUObjectDescriptorBase {
    label?: string;
    measureExecutionTime?: boolean;
  }
  /** @deprecated */
  type GPUTextureDataLayout = GPUImageDataLayout;
  interface GPUImageDataLayout {
    offset?: number;
    bytesPerRow?: number;
    rowsPerImage?: number;
  }
  /** @deprecated */
  type GPUBufferCopyView = GPUImageCopyBuffer;
  interface GPUImageCopyBuffer extends GPUImageDataLayout {
    buffer: GPUBuffer;
  }
  /** @deprecated */
  type GPUTextureCopyView = GPUImageCopyTexture;
  interface GPUImageCopyTexture {
    texture: GPUTexture;
    mipLevel?: number;
    origin?: GPUOrigin3D;
    aspect?: GPUTextureAspect;
  }
  interface GPUImageBitmapCopyView {
    imageBitmap: ImageBitmap;
    origin?: GPUOrigin2D;
  }
  interface GPUProgrammablePassEncoder {
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsets?: Iterable<number>
    ): undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsetsData: Uint32Array,
      dynamicOffsetsDataStart: number,
      dynamicOffsetsDataLength: number
    ): undefined;
    popDebugGroup(): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    insertDebugMarker(markerLabel: string): undefined;
  }
  class GPUComputePassEncoder
    implements GPUObjectBase, GPUProgrammablePassEncoder {
    private __brand: void;
    label: string | undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsets?: Iterable<number>
    ): undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsetsData: Uint32Array,
      dynamicOffsetsDataStart: number,
      dynamicOffsetsDataLength: number
    ): undefined;
    popDebugGroup(): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    insertDebugMarker(markerLabel: string): undefined;
    setPipeline(pipeline: GPUComputePipeline): undefined;
    dispatch(x: number, y?: number, z?: number): undefined;
    dispatchIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
    writeTimestamp(querySet: GPUQuerySet, queryIndex: number): undefined;
    beginPipelineStatisticsQuery(
      querySet: GPUQuerySet,
      queryIndex: number
    ): undefined;
    endPipelineStatisticsQuery(querySet: GPUQuerySet, queryIndex: number): undefined;
    endPass(): undefined;
  }
  interface GPUComputePassDescriptor extends GPUObjectDescriptorBase {}
  interface GPURenderEncoderBase {
    setPipeline(pipeline: GPURenderPipeline): undefined;
    setIndexBuffer(
      buffer: GPUBuffer,
      indexFormat: GPUIndexFormat,
      offset?: number,
      size?: number
    ): undefined;
    setVertexBuffer(
      slot: number,
      buffer: GPUBuffer,
      offset?: number,
      size?: number
    ): undefined;
    draw(
      vertexCount: number,
      instanceCount?: number,
      firstVertex?: number,
      firstInstance?: number
    ): undefined;
    drawIndexed(
      indexCount: number,
      instanceCount?: number,
      firstIndex?: number,
      baseVertex?: number,
      firstInstance?: number
    ): undefined;
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
    drawIndexedIndirect(
      indirectBuffer: GPUBuffer,
      indirectOffset: number
    ): undefined;
  }
  class GPURenderPassEncoder
    implements GPUObjectBase, GPUProgrammablePassEncoder, GPURenderEncoderBase {
    private __brand: void;
    label: string | undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsets?: Iterable<number>
    ): undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsetsData: Uint32Array,
      dynamicOffsetsDataStart: number,
      dynamicOffsetsDataLength: number
    ): undefined;
    popDebugGroup(): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    insertDebugMarker(markerLabel: string): undefined;
    setPipeline(pipeline: GPURenderPipeline): undefined;
    setIndexBuffer(
      buffer: GPUBuffer,
      indexFormat: GPUIndexFormat,
      offset?: number,
      size?: number
    ): undefined;
    setVertexBuffer(slot: number, buffer: GPUBuffer, offset?: number): undefined;
    draw(
      vertexCount: number,
      instanceCount?: number,
      firstVertex?: number,
      firstInstance?: number
    ): undefined;
    drawIndexed(
      indexCount: number,
      instanceCount?: number,
      firstIndex?: number,
      baseVertex?: number,
      firstInstance?: number
    ): undefined;
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
    drawIndexedIndirect(
      indirectBuffer: GPUBuffer,
      indirectOffset: number
    ): undefined;
    setViewport(
      x: number,
      y: number,
      width: number,
      height: number,
      minDepth: number,
      maxDepth: number
    ): undefined;
    setScissorRect(x: number, y: number, width: number, height: number): undefined;
    setBlendColor(color: GPUColor): undefined;
    setStencilReference(reference: number): undefined;
    writeTimestamp(querySet: GPUQuerySet, queryIndex: number): undefined;
    beginOcclusionQuery(queryIndex: number): undefined;
    endOcclusionQuery(): undefined;
    beginPipelineStatisticsQuery(
      querySet: GPUQuerySet,
      queryIndex: number
    ): undefined;
    endPipelineStatisticsQuery(querySet: GPUQuerySet, queryIndex: number): undefined;
    executeBundles(bundles: Iterable<GPURenderBundle>): undefined;
    endPass(): undefined;
  }
  interface GPURenderPassDescriptor extends GPUObjectDescriptorBase {
    colorAttachments: Iterable<GPURenderPassColorAttachment>;
    depthStencilAttachment?: GPURenderPassDepthStencilAttachment;
    occlusionQuerySet?: GPUQuerySet;
  }
  /** @deprecated */
  type GPURenderPassColorAttachmentDescriptor = GPURenderPassColorAttachment;
  interface GPURenderPassColorAttachment {
    attachment: GPUTextureView;
    resolveTarget?: GPUTextureView;
    loadValue: GPULoadOp | GPUColor;
    storeOp?: GPUStoreOp;
  }
  /** @deprecated */
  type GPURenderPassDepthStencilAttachmentDescriptor = GPURenderPassDepthStencilAttachment;
  interface GPURenderPassDepthStencilAttachment {
    attachment: GPUTextureView;
    depthLoadValue: GPULoadOp | number;
    depthStoreOp: GPUStoreOp;
    depthReadOnly?: boolean;
    stencilLoadValue: GPULoadOp | number;
    stencilStoreOp: GPUStoreOp;
    stencilReadOnly?: boolean;
  }
  type GPULoadOp = "load";
  type GPUStoreOp = "store" | "clear";
  class GPURenderBundle implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
  }
  interface GPURenderBundleDescriptor extends GPUObjectDescriptorBase {}
  class GPURenderBundleEncoder implements GPURenderEncoderBase {
    private __brand: void;
    label: string | undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsets?: Iterable<number>
    ): undefined;
    setBindGroup(
      index: number,
      bindGroup: GPUBindGroup,
      dynamicOffsetsData: Uint32Array,
      dynamicOffsetsDataStart: number,
      dynamicOffsetsDataLength: number
    ): undefined;
    popDebugGroup(): undefined;
    pushDebugGroup(groupLabel: string): undefined;
    insertDebugMarker(markerLabel: string): undefined;
    setPipeline(pipeline: GPURenderPipeline): undefined;
    setIndexBuffer(
      buffer: GPUBuffer,
      indexFormat: GPUIndexFormat,
      offset?: number,
      size?: number
    ): undefined;
    setVertexBuffer(
      slot: number,
      buffer: GPUBuffer,
      offset?: number,
      size?: number
    ): undefined;
    draw(
      vertexCount: number,
      instanceCount?: number,
      firstVertex?: number,
      firstInstance?: number
    ): undefined;
    drawIndexed(
      indexCount: number,
      instanceCount?: number,
      firstIndex?: number,
      baseVertex?: number,
      firstInstance?: number
    ): undefined;
    drawIndirect(indirectBuffer: GPUBuffer, indirectOffset: number): undefined;
    drawIndexedIndirect(
      indirectBuffer: GPUBuffer,
      indirectOffset: number
    ): undefined;
    finish(descriptor?: GPURenderBundleDescriptor): GPURenderBundle;
  }
  interface GPURenderBundleEncoderDescriptor extends GPUObjectDescriptorBase {
    colorFormats: Iterable<GPUTextureFormat>;
    depthStencilFormat?: GPUTextureFormat;
    sampleCount?: number;
  }
  class GPUQueue implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    signal(fence: GPUFence, signalValue: number): undefined;
    submit(commandBuffers: Iterable<GPUCommandBuffer>): undefined;
    createFence(descriptor?: GPUFenceDescriptor): GPUFence;
    writeBuffer(
      buffer: GPUBuffer,
      bufferOffset: number,
      data: BufferSource | SharedArrayBuffer,
      dataOffset?: number,
      size?: number
    ): undefined;
    writeTexture(
      destination: GPUImageCopyTexture,
      data: BufferSource | SharedArrayBuffer,
      dataLayout: GPUTextureDataLayout,
      size: GPUExtent3DStrict
    ): undefined;
    copyImageBitmapToTexture(
      source: GPUImageBitmapCopyView,
      destination: GPUImageCopyTexture,
      copySize: GPUExtent3DStrict
    ): undefined;
  }
  class GPUQuerySet implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    destroy(): undefined;
  }
  interface GPUQuerySetDescriptor extends GPUObjectDescriptorBase {
    type: GPUQueryType;
    count: number;
    pipelineStatistics?: Iterable<GPUPipelineStatisticName>;
  }
  type GPUQueryType = "occlusion" | "timestamp" | "pipeline-statistics";
  type GPUPipelineStatisticName =
    | "vertex-shader-invocations"
    | "clipper-invocations"
    | "clipper-primitives-out"
    | "fragment-shader-invocations"
    | "compute-shader-invocations";
  class GPUCanvasContext {
    private __brand: void;
    configureSwapChain(descriptor: GPUSwapChainDescriptor): GPUSwapChain;
    getSwapChainPreferredFormat(adapter: GPUAdapter): GPUTextureFormat;
    /** @deprecated */
    getSwapChainPreferredFormat(device: GPUDevice): Promise<GPUTextureFormat>;
  }
  interface GPUSwapChainDescriptor extends GPUObjectDescriptorBase {
    device: GPUDevice;
    format: GPUTextureFormat;
    usage?: GPUTextureUsageFlags;
  }
  class GPUSwapChain implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    getCurrentTexture(): GPUTexture;
  }
  class GPUDeviceLostInfo {
    private __brand: void;
    readonly message: string;
  }
  type GPUErrorFilter = "out-of-memory" | "validation";
  class GPUOutOfMemoryError {
    private __brand: void;
    constructor();
  }
  class GPUValidationError {
    private __brand: void;
    constructor(message: string);
    readonly message: string;
  }
  type GPUError = GPUOutOfMemoryError | GPUValidationError;
  class GPUUncapturedErrorEvent extends Event {
    private __brand: void;
    constructor(
      type: string,
      gpuUncapturedErrorEventInitDict: GPUUncapturedErrorEventInit
    );
    readonly error: GPUError;
  }
  interface GPUUncapturedErrorEventInit extends EventInit {
    error: GPUError;
  }
  interface GPUColorDict {
    a: number;
    b: number;
    g: number;
    r: number;
  }
  type GPUColor = [number, number, number, number] | GPUColorDict;
  interface GPUOrigin2DDict {
    x?: number;
    y?: number;
  }
  type GPUOrigin2D = [number, number] | GPUOrigin2DDict;
  interface GPUOrigin3DDict {
    x?: number;
    y?: number;
    z?: number;
  }
  type GPUOrigin3D = number[] | GPUOrigin3DDict;
  interface GPUExtent3DDict {
    width: number;
    height?: number;
    depthOrArrayLayers?: number;
  }
  type GPUExtent3D = number[] | GPUExtent3DDict;
  interface GPUExtent3DDictStrict extends GPUExtent3DDict {
    depth?: undefined;
  }
  type GPUExtent3DStrict = number[] | GPUExtent3DDictStrict;

  // *********************************************************************************************
  // Deprecated
  // *********************************************************************************************

  /** @deprecated */
  type GPUBindingType =
    | "uniform-buffer"
    | "storage-buffer"
    | "readonly-storage-buffer"
    | "sampler"
    | "comparison-sampler"
    | "sampled-texture"
    | "multisampled-texture"
    | "readonly-storage-texture"
    | "writeonly-storage-texture";
  /** @deprecated */
  type GPUTextureComponentType = "float" | "sint" | "uint" | "depth-comparison";
  /** @deprecated */
  type GPUBlendDescriptor = GPUBlendComponent;
  /** @deprecated */
  interface GPUColorStateDescriptor {
    format: GPUTextureFormat;
    alphaBlend?: GPUBlendDescriptor;
    colorBlend?: GPUBlendDescriptor;
    writeMask?: GPUColorWriteFlags;
  }
  /** @deprecated */
  interface GPUDepthStencilStateDescriptor {
    format: GPUTextureFormat;
    depthWriteEnabled?: boolean;
    depthCompare?: GPUCompareFunction;
    stencilFront?: GPUStencilStateFaceDescriptor;
    stencilBack?: GPUStencilStateFaceDescriptor;
    stencilReadMask?: number;
    stencilWriteMask?: number;
  }
  /** @deprecated */
  interface GPUFenceDescriptor extends GPUObjectDescriptorBase {
    initialValue?: number;
    label?: string;
    signalQueue?: GPUQueue;
  }
  /** @deprecated */
  interface GPUVertexStateDescriptor {
    indexFormat?: GPUIndexFormat;
    vertexBuffers?: Iterable<GPUVertexBufferLayoutDescriptor>;
  }
  /** @deprecated */
  interface GPURasterizationStateDescriptor {
    frontFace?: GPUFrontFace;
    cullMode?: GPUCullMode;
    clampDepth?: boolean;
    depthBias?: number;
    depthBiasSlopeScale?: number;
    depthBiasClamp?: number;
  }
  /** @deprecated */
  type GPUStencilStateFaceDescriptor = GPUStencilFaceState;
  /** @deprecated */
  class GPUFence implements GPUObjectBase {
    private __brand: void;
    label: string | undefined;
    getCompletedValue(): number;
    onCompletion(completionValue: number): Promise<undefined>;
  }
}
export {};
