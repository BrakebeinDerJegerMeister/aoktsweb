(module
 (type $0 (func (param f32) (result f32)))
 (type $1 (func (param i32 i32) (result i32)))
 (global $~lib/native/ASC_SHRINK_LEVEL i32 (i32.const 0))
 (global $~lib/math/rempio2f_y (mut f64) (f64.const 0))
 (global $~lib/memory/__data_end i32 (i32.const 40))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 32808))
 (global $~lib/memory/__heap_base i32 (i32.const 32808))
 (memory $0 1)
 (data $0 (i32.const 8) ")\15DNn\83\f9\a2\c0\dd4\f5\d1W\'\fcA\90C<\99\95b\dba\c5\bb\de\abcQ\fe")
 (table $0 1 1 funcref)
 (elem $0 (i32.const 1))
 (export "computeSin" (func $assembly/index/computeSin))
 (export "add" (func $assembly/index/add))
 (export "memory" (memory $0))
 (func $~lib/math/NativeMathf.sin (param $x f32) (result f32)
  (local $ux i32)
  (local $sign i32)
  (local $x|3 f64)
  (local $z f64)
  (local $w f64)
  (local $r f64)
  (local $s f64)
  (local $x|8 f64)
  (local $z|9 f64)
  (local $w|10 f64)
  (local $r|11 f64)
  (local $x|12 f64)
  (local $z|13 f64)
  (local $w|14 f64)
  (local $r|15 f64)
  (local $x|16 f64)
  (local $z|17 f64)
  (local $w|18 f64)
  (local $r|19 f64)
  (local $s|20 f64)
  (local $x|21 f64)
  (local $z|22 f64)
  (local $w|23 f64)
  (local $r|24 f64)
  (local $x|25 f64)
  (local $z|26 f64)
  (local $w|27 f64)
  (local $r|28 f64)
  (local $x|29 f64)
  (local $z|30 f64)
  (local $w|31 f64)
  (local $r|32 f64)
  (local $s|33 f64)
  (local $x|34 f32)
  (local $u i32)
  (local $sign|36 i32)
  (local $q f64)
  (local $x|38 f32)
  (local $u|39 i32)
  (local $offset i32)
  (local $shift i64)
  (local $tblPtr i32)
  (local $b0 i64)
  (local $b1 i64)
  (local $lo i64)
  (local $b2 i64)
  (local $hi i64)
  (local $mantissa i64)
  (local $product i64)
  (local $r|50 i64)
  (local $q|51 i32)
  (local $q|52 i32)
  (local $n i32)
  (local $y f64)
  (local $x|55 f64)
  (local $z|56 f64)
  (local $w|57 f64)
  (local $r|58 f64)
  (local $x|59 f64)
  (local $z|60 f64)
  (local $w|61 f64)
  (local $r|62 f64)
  (local $s|63 f64)
  (local $t f32)
  local.get $x
  i32.reinterpret_f32
  local.set $ux
  local.get $ux
  i32.const 31
  i32.shr_u
  local.set $sign
  local.get $ux
  i32.const 2147483647
  i32.and
  local.set $ux
  local.get $ux
  i32.const 1061752794
  i32.le_u
  if
   local.get $ux
   i32.const 964689920
   i32.lt_u
   if
    local.get $x
    return
   end
   block $~lib/math/sin_kernf|inlined.0 (result f32)
    local.get $x
    f64.promote_f32
    local.set $x|3
    local.get $x|3
    local.get $x|3
    f64.mul
    local.set $z
    local.get $z
    local.get $z
    f64.mul
    local.set $w
    f64.const -1.9839334836096632e-04
    local.get $z
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    local.set $r
    local.get $z
    local.get $x|3
    f64.mul
    local.set $s
    local.get $x|3
    local.get $s
    f64.const -0.16666666641626524
    local.get $z
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $s
    local.get $w
    f64.mul
    local.get $r
    f64.mul
    f64.add
    f32.demote_f64
    br $~lib/math/sin_kernf|inlined.0
   end
   return
  end
  i32.const 0
  i32.const 1
  i32.lt_s
  drop
  local.get $ux
  i32.const 1081824209
  i32.le_u
  if
   local.get $ux
   i32.const 1075235811
   i32.le_u
   if
    local.get $sign
    if (result f32)
     block $~lib/math/cos_kernf|inlined.0 (result f32)
      local.get $x
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.add
      local.set $x|8
      local.get $x|8
      local.get $x|8
      f64.mul
      local.set $z|9
      local.get $z|9
      local.get $z|9
      f64.mul
      local.set $w|10
      f64.const -0.001388676377460993
      local.get $z|9
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      local.set $r|11
      f32.const 1
      f64.promote_f32
      local.get $z|9
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $w|10
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $w|10
      local.get $z|9
      f64.mul
      local.get $r|11
      f64.mul
      f64.add
      f32.demote_f64
      br $~lib/math/cos_kernf|inlined.0
     end
     f32.neg
    else
     block $~lib/math/cos_kernf|inlined.1 (result f32)
      local.get $x
      f64.promote_f32
      f64.const 1.5707963267948966
      f64.sub
      local.set $x|12
      local.get $x|12
      local.get $x|12
      f64.mul
      local.set $z|13
      local.get $z|13
      local.get $z|13
      f64.mul
      local.set $w|14
      f64.const -0.001388676377460993
      local.get $z|13
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      local.set $r|15
      f32.const 1
      f64.promote_f32
      local.get $z|13
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $w|14
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $w|14
      local.get $z|13
      f64.mul
      local.get $r|15
      f64.mul
      f64.add
      f32.demote_f64
      br $~lib/math/cos_kernf|inlined.1
     end
    end
    return
   end
   block $~lib/math/sin_kernf|inlined.1 (result f32)
    local.get $sign
    if (result f64)
     local.get $x
     f64.promote_f32
     f64.const 3.141592653589793
     f64.add
    else
     local.get $x
     f64.promote_f32
     f64.const 3.141592653589793
     f64.sub
    end
    f64.neg
    local.set $x|16
    local.get $x|16
    local.get $x|16
    f64.mul
    local.set $z|17
    local.get $z|17
    local.get $z|17
    f64.mul
    local.set $w|18
    f64.const -1.9839334836096632e-04
    local.get $z|17
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    local.set $r|19
    local.get $z|17
    local.get $x|16
    f64.mul
    local.set $s|20
    local.get $x|16
    local.get $s|20
    f64.const -0.16666666641626524
    local.get $z|17
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $s|20
    local.get $w|18
    f64.mul
    local.get $r|19
    f64.mul
    f64.add
    f32.demote_f64
    br $~lib/math/sin_kernf|inlined.1
   end
   return
  end
  local.get $ux
  i32.const 1088565717
  i32.le_u
  if
   local.get $ux
   i32.const 1085271519
   i32.le_u
   if
    local.get $sign
    if (result f32)
     block $~lib/math/cos_kernf|inlined.2 (result f32)
      local.get $x
      f64.promote_f32
      f64.const 4.71238898038469
      f64.add
      local.set $x|21
      local.get $x|21
      local.get $x|21
      f64.mul
      local.set $z|22
      local.get $z|22
      local.get $z|22
      f64.mul
      local.set $w|23
      f64.const -0.001388676377460993
      local.get $z|22
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      local.set $r|24
      f32.const 1
      f64.promote_f32
      local.get $z|22
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $w|23
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $w|23
      local.get $z|22
      f64.mul
      local.get $r|24
      f64.mul
      f64.add
      f32.demote_f64
      br $~lib/math/cos_kernf|inlined.2
     end
    else
     block $~lib/math/cos_kernf|inlined.3 (result f32)
      local.get $x
      f64.promote_f32
      f64.const 4.71238898038469
      f64.sub
      local.set $x|25
      local.get $x|25
      local.get $x|25
      f64.mul
      local.set $z|26
      local.get $z|26
      local.get $z|26
      f64.mul
      local.set $w|27
      f64.const -0.001388676377460993
      local.get $z|26
      f64.const 2.439044879627741e-05
      f64.mul
      f64.add
      local.set $r|28
      f32.const 1
      f64.promote_f32
      local.get $z|26
      f64.const -0.499999997251031
      f64.mul
      f64.add
      local.get $w|27
      f64.const 0.04166662332373906
      f64.mul
      f64.add
      local.get $w|27
      local.get $z|26
      f64.mul
      local.get $r|28
      f64.mul
      f64.add
      f32.demote_f64
      br $~lib/math/cos_kernf|inlined.3
     end
     f32.neg
    end
    return
   end
   block $~lib/math/sin_kernf|inlined.2 (result f32)
    local.get $sign
    if (result f64)
     local.get $x
     f64.promote_f32
     f64.const 6.283185307179586
     f64.add
    else
     local.get $x
     f64.promote_f32
     f64.const 6.283185307179586
     f64.sub
    end
    local.set $x|29
    local.get $x|29
    local.get $x|29
    f64.mul
    local.set $z|30
    local.get $z|30
    local.get $z|30
    f64.mul
    local.set $w|31
    f64.const -1.9839334836096632e-04
    local.get $z|30
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    local.set $r|32
    local.get $z|30
    local.get $x|29
    f64.mul
    local.set $s|33
    local.get $x|29
    local.get $s|33
    f64.const -0.16666666641626524
    local.get $z|30
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $s|33
    local.get $w|31
    f64.mul
    local.get $r|32
    f64.mul
    f64.add
    f32.demote_f64
    br $~lib/math/sin_kernf|inlined.2
   end
   return
  end
  local.get $ux
  i32.const 2139095040
  i32.ge_u
  if
   local.get $x
   local.get $x
   f32.sub
   return
  end
  block $~lib/math/rempio2f|inlined.0 (result i32)
   local.get $x
   local.set $x|34
   local.get $ux
   local.set $u
   local.get $sign
   local.set $sign|36
   local.get $u
   i32.const 1305022427
   i32.lt_u
   if
    local.get $x|34
    f64.promote_f32
    f64.const 0.6366197723675814
    f64.mul
    f64.nearest
    local.set $q
    local.get $x|34
    f64.promote_f32
    local.get $q
    f64.const 1.5707963109016418
    f64.mul
    f64.sub
    local.get $q
    f64.const 1.5893254773528196e-08
    f64.mul
    f64.sub
    global.set $~lib/math/rempio2f_y
    local.get $q
    i32.trunc_sat_f64_s
    br $~lib/math/rempio2f|inlined.0
   end
   block $~lib/math/pio2f_large_quot|inlined.0 (result i32)
    local.get $x|34
    local.set $x|38
    local.get $u
    local.set $u|39
    local.get $u|39
    i32.const 23
    i32.shr_s
    i32.const 152
    i32.sub
    local.set $offset
    local.get $offset
    i32.const 63
    i32.and
    i64.extend_i32_s
    local.set $shift
    i32.const 8
    local.get $offset
    i32.const 6
    i32.shr_s
    i32.const 3
    i32.shl
    i32.add
    local.set $tblPtr
    local.get $tblPtr
    i64.load
    local.set $b0
    local.get $tblPtr
    i64.load offset=8
    local.set $b1
    local.get $shift
    i64.const 32
    i64.gt_u
    if
     local.get $tblPtr
     i64.load offset=16
     local.set $b2
     local.get $b2
     i64.const 96
     local.get $shift
     i64.sub
     i64.shr_u
     local.set $lo
     local.get $lo
     local.get $b1
     local.get $shift
     i64.const 32
     i64.sub
     i64.shl
     i64.or
     local.set $lo
    else
     local.get $b1
     i64.const 32
     local.get $shift
     i64.sub
     i64.shr_u
     local.set $lo
    end
    local.get $b1
    i64.const 64
    local.get $shift
    i64.sub
    i64.shr_u
    local.get $b0
    local.get $shift
    i64.shl
    i64.or
    local.set $hi
    local.get $u|39
    i32.const 8388607
    i32.and
    i32.const 8388608
    i32.or
    i64.extend_i32_s
    local.set $mantissa
    local.get $mantissa
    local.get $hi
    i64.mul
    local.get $mantissa
    local.get $lo
    i64.mul
    i64.const 32
    i64.shr_u
    i64.add
    local.set $product
    local.get $product
    i64.const 2
    i64.shl
    local.set $r|50
    local.get $product
    i64.const 62
    i64.shr_u
    local.get $r|50
    i64.const 63
    i64.shr_u
    i64.add
    i32.wrap_i64
    local.set $q|51
    f64.const 8.515303950216386e-20
    local.get $x|38
    f64.promote_f32
    f64.copysign
    local.get $r|50
    f64.convert_i64_s
    f64.mul
    global.set $~lib/math/rempio2f_y
    local.get $q|51
    br $~lib/math/pio2f_large_quot|inlined.0
   end
   local.set $q|52
   i32.const 0
   local.get $q|52
   i32.sub
   local.get $q|52
   local.get $sign|36
   select
   br $~lib/math/rempio2f|inlined.0
  end
  local.set $n
  global.get $~lib/math/rempio2f_y
  local.set $y
  local.get $n
  i32.const 1
  i32.and
  if (result f32)
   block $~lib/math/cos_kernf|inlined.4 (result f32)
    local.get $y
    local.set $x|55
    local.get $x|55
    local.get $x|55
    f64.mul
    local.set $z|56
    local.get $z|56
    local.get $z|56
    f64.mul
    local.set $w|57
    f64.const -0.001388676377460993
    local.get $z|56
    f64.const 2.439044879627741e-05
    f64.mul
    f64.add
    local.set $r|58
    f32.const 1
    f64.promote_f32
    local.get $z|56
    f64.const -0.499999997251031
    f64.mul
    f64.add
    local.get $w|57
    f64.const 0.04166662332373906
    f64.mul
    f64.add
    local.get $w|57
    local.get $z|56
    f64.mul
    local.get $r|58
    f64.mul
    f64.add
    f32.demote_f64
    br $~lib/math/cos_kernf|inlined.4
   end
  else
   block $~lib/math/sin_kernf|inlined.3 (result f32)
    local.get $y
    local.set $x|59
    local.get $x|59
    local.get $x|59
    f64.mul
    local.set $z|60
    local.get $z|60
    local.get $z|60
    f64.mul
    local.set $w|61
    f64.const -1.9839334836096632e-04
    local.get $z|60
    f64.const 2.718311493989822e-06
    f64.mul
    f64.add
    local.set $r|62
    local.get $z|60
    local.get $x|59
    f64.mul
    local.set $s|63
    local.get $x|59
    local.get $s|63
    f64.const -0.16666666641626524
    local.get $z|60
    f64.const 0.008333329385889463
    f64.mul
    f64.add
    f64.mul
    f64.add
    local.get $s|63
    local.get $w|61
    f64.mul
    local.get $r|62
    f64.mul
    f64.add
    f32.demote_f64
    br $~lib/math/sin_kernf|inlined.3
   end
  end
  local.set $t
  local.get $n
  i32.const 2
  i32.and
  if (result f32)
   local.get $t
   f32.neg
  else
   local.get $t
  end
  return
 )
 (func $assembly/index/computeSin (param $angle f32) (result f32)
  local.get $angle
  call $~lib/math/NativeMathf.sin
  return
 )
 (func $assembly/index/add (param $a i32) (param $b i32) (result i32)
  local.get $a
  local.get $b
  i32.add
  return
 )
)
