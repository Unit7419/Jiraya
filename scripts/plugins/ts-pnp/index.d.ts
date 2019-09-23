import * as ts from 'typescript'

// FIXME: ts.ResolvedModuleNameWithFallbackLocations
// type ResolveModuleNameReturn = ts.ResolvedModuleNameWithFallbackLocations
type ResolveModuleNameReturn = any

export declare function resolveModuleName<T = ResolveModuleNameReturn>(
  moduleName: string,
  containingFile: string,
  options: ts.CompilerOptions,
  moduleResolutionHost: ts.ModuleResolutionHost,

  realResolveModuleName: (
    moduleName: string,
    containingFile: string,
    options: ts.CompilerOptions,
    moduleResolutionHost: ts.ModuleResolutionHost,
  ) => T,
): T
