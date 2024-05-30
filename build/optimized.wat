(module
 (type $0 (func (param f32) (result f32)))
 (type $1 (func (param i32 i32) (result i32)))
 (global $~lib/math/rempio2f_y (mut f64) (f64.const 0))
 (memory $0 1)
 (data $0 (i32.const 1024) ")\15DNn\83\f9\a2\c0\dd4\f5\d1W\'\fcA\90C<\99\95b\dba\c5\bb\de\abcQ\fe")
 (export "computeSin" (func $assembly/index/computeSin))
 (export "add" (func $assembly/index/add))
 (export "memory" (memory $0))
 (func $~lib/math/NativeMathf.sin (param $0 f32) (result f32)
  (local $1 f64)
  (local $2 f64)
  (local $3 i32)
  (local $4 f64)
  (local $5 i64)
  (local $6 i32)
  (local $7 i32)
  (local $8 i64)
  (local $9 i64)
  local.get $0
  i32.reinterpret_f32
  local.tee $3
  i32.const 31
  i32.shr_u
  local.set $6
  block $folding-inner0
   local.get $3
   i32.const 2147483647
   i32.and
   local.tee $3
   i32.const 1061752794
   i32.le_u
   if
    local.get $3
    i32.const 964689920
    i32.lt_u
    if
     local.get $0
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $2
    local.get $2
    f64.mul
    local.tee $1
    local.get $2
    f64.mul
    local.set $4
    br $folding-inner0
   end
   local.get $3
   i32.const 1081824209
   i32.le_u
   if
    local.get $3
    i32.const 1075235811
    i32.le_u
    if
     local.get $6
     if (result f32)
      local.get $0
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.add
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
      f32.neg
     else
      local.get $0
      f64.promote_f32
      f64.const -1.5707963267948966
      f64.add
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
     end
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $1
    f64.const 3.141592653589793
    f64.add
    local.get $1
    f64.const -3.141592653589793
    f64.add
    local.get $6
    select
    f64.neg
    local.tee $2
    local.get $2
    f64.mul
    local.tee $1
    local.get $2
    f64.mul
    local.set $4
    br $folding-inner0
   end
   local.get $3
   i32.const 1088565717
   i32.le_u
   if
    local.get $3
    i32.const 1085271519
    i32.le_u
    if
     local.get $6
     if (result f32)
      local.get $0
      f64.promote_f32
      f64.const 4.71238898038469
      f64.add
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
     else
      local.get $0
      f64.promote_f32
      f64.const -4.71238898038469
      f64.add
      local.tee $1
      local.get $1
      f64.mul
      local.tee $1
      local.get $1
      f64.mul
      local.set $2
      local.get $1
      f64.const -0.499999997251031
      f64.mul
      f64.const 1
      f64.add
      local.get $2
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $2
      local.get $1
      f64.mul
      local.get $1
      f64.const 2.439044879627741e-05
      f64.mul
      f64.const -0.001388676377460993
      f64.add
      f64.mul
      f64.add
      f32.demote_f64
      f32.neg
     end
     return
    end
    local.get $0
    f64.promote_f32
    local.tee $1
    f64.const 6.283185307179586
    f64.add
    local.get $1
    f64.const -6.283185307179586
    f64.add
    local.get $6
    select
    local.tee $2
    local.get $2
    f64.mul
    local.tee $1
    local.get $2
    f64.mul
    local.set $4
    br $folding-inner0
   end
   local.get $3
   i32.const 2139095040
   i32.ge_u
   if
    local.get $0
    local.get $0
    f32.sub
    return
   end
   block $~lib/math/rempio2f|inlined.0 (result i32)
    local.get $3
    i32.const 1305022427
    i32.lt_u
    if
     local.get $0
     f64.promote_f32
     local.tee $1
     f64.const 0.6366197723675814
     f64.mul
     f64.nearest
     local.set $2
     local.get $1
     local.get $2
     f64.const 1.5707963109016418
     f64.mul
     f64.sub
     local.get $2
     f64.const 1.5893254773528196e-08
     f64.mul
     f64.sub
     global.set $~lib/math/rempio2f_y
     local.get $2
     i32.trunc_sat_f64_s
     br $~lib/math/rempio2f|inlined.0
    end
    local.get $3
    i32.const 23
    i32.shr_s
    i32.const 152
    i32.sub
    local.tee $7
    i32.const 63
    i32.and
    i64.extend_i32_s
    local.set $8
    local.get $7
    i32.const 6
    i32.shr_s
    i32.const 3
    i32.shl
    i32.const 1024
    i32.add
    local.tee $7
    i64.load offset=8
    local.set $5
    f64.const 8.515303950216386e-20
    local.get $0
    f64.promote_f32
    f64.copysign
    local.get $3
    i32.const 8388607
    i32.and
    i32.const 8388608
    i32.or
    i64.extend_i32_s
    local.tee $9
    local.get $7
    i64.load
    local.get $8
    i64.shl
    local.get $5
    i64.const 64
    local.get $8
    i64.sub
    i64.shr_u
    i64.or
    i64.mul
    local.get $8
    i64.const 32
    i64.gt_u
    if (result i64)
     local.get $5
     local.get $8
     i64.const 32
     i64.sub
     i64.shl
     local.get $7
     i64.load offset=16
     i64.const 96
     local.get $8
     i64.sub
     i64.shr_u
     i64.or
    else
     local.get $5
     i64.const 32
     local.get $8
     i64.sub
     i64.shr_u
    end
    local.get $9
    i64.mul
    i64.const 32
    i64.shr_u
    i64.add
    local.tee $5
    i64.const 2
    i64.shl
    local.tee $8
    f64.convert_i64_s
    f64.mul
    global.set $~lib/math/rempio2f_y
    i32.const 0
    local.get $5
    i64.const 62
    i64.shr_u
    local.get $8
    i64.const 63
    i64.shr_u
    i64.add
    i32.wrap_i64
    local.tee $3
    i32.sub
    local.get $3
    local.get $6
    select
   end
   local.set $3
   global.get $~lib/math/rempio2f_y
   local.set $1
   local.get $3
   i32.const 1
   i32.and
   if (result f32)
    local.get $1
    local.get $1
    f64.mul
    local.tee $1
    local.get $1
    f64.mul
    local.set $2
    local.get $1
    f64.const -0.499999997251031
    f64.mul
    f64.const 1
    f64.add
    local.get $2
    f64.const 0.04166662332373906
    f64.mul
    f64.add
    local.get $2
    local.get $1
    f64.mul
    local.get $1
    f64.const 2.439044879627741e-05
    f64.mul
    f64.const -0.001388676377460993
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   else
    local.get $1
    local.get $1
    local.get $1
    f64.mul
    local.tee $2
    local.get $1
    f64.mul
    local.tee $1
    local.get $2
    f64.const 0.008333329385889463
    f64.mul
    f64.const -0.16666666641626524
    f64.add
    f64.mul
    f64.add
    local.get $1
    local.get $2
    local.get $2
    f64.mul
    f64.mul
    local.get $2
    f64.const 2.718311493989822e-06
    f64.mul
    f64.const -1.9839334836096632e-04
    f64.add
    f64.mul
    f64.add
    f32.demote_f64
   end
   local.tee $0
   f32.neg
   local.get $0
   local.get $3
   i32.const 2
   i32.and
   select
   return
  end
  local.get $2
  local.get $4
  local.get $1
  f64.const 0.008333329385889463
  f64.mul
  f64.const -0.16666666641626524
  f64.add
  f64.mul
  f64.add
  local.get $4
  local.get $1
  local.get $1
  f64.mul
  f64.mul
  local.get $1
  f64.const 2.718311493989822e-06
  f64.mul
  f64.const -1.9839334836096632e-04
  f64.add
  f64.mul
  f64.add
  f32.demote_f64
 )
 (func $assembly/index/computeSin (param $0 f32) (result f32)
  local.get $0
  call $~lib/math/NativeMathf.sin
 )
 (func $assembly/index/add (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  i32.add
 )
)
