<?php
require('index.php');
error_reporting(0);

$op = $_GET['op'];
switch ($op) {
    case '':
        normal();
        break;
    default:
        normal();
        break;
    case 'create':
        create();
        break;
    case 'detail':
        detail();
        break;
    case 'update':
        update();
        break;
    case 'delete':
        delete();
        break;
}

function normal()
{
    global $conn;
    $sql1 = "select * from pegawai order by id desc";
    $q1 = mysqli_query($conn, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'nama' => $r1['nama'],
            'alamat' => $r1['alamat'],
            'jabatan' => $r1['jabatan'],
            'gaji' => $r1['gaji'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function create()
{
    global $conn;
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    $jabatan = $_POST['jabatan'];
    $gaji = $_POST['gaji'];
    $hasil = "Gagal dimasukkan data";
    if ($nama and $alamat) {
        $sql1 = "insert into pegawai(nama,alamat,jabatan,gaji) values ('$nama','$alamat','$jabatan','$gaji')";
        $q1 = mysqli_query($conn, $sql1);
        if ($q1) {
            $hasil = "Berhasil menambahkan data";
        }
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail()
{
    global $conn;
    $id = $_GET['id'];
    $sql1 = "select * from pegawai where id = '$id'";
    $q1 = mysqli_query($conn, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'nama' => $r1['nama'],
            'alamat' => $r1['alamat'],
            'jabatan' => $r1['jabatan'],
            'gaji' => $r1['gaji'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function detail2()
{
    global $conn;
    $id = $_GET['id'];
    $sql1 = "select * from pegawai where id = '$id'";
    $q1 = mysqli_query($conn, $sql1);
    while ($r1 = mysqli_fetch_array($q1)) {
        $hasil[] = array(
            'id' => $r1['id'],
            'nama' => $r1['nama'],
            'alamat' => $r1['alamat'],
            'jabatan' => $r1['jabatan'],
            'gaji' => $r1['gaji'],
            'tgl_input' => $r1['tgl_input']
        );
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function update()
{
    global $conn;
    $id = $_GET['id'];
    $nama = $_POST['nama'];
    $alamat = $_POST['alamat'];
    $jabatan = $_POST['jabatan'];
    $gaji = $_POST['gaji'];
    $hasil = "Gagal melakukan update data";
    $sql1 = "update pegawai set nama='$nama', alamat='$alamat', jabatan='$jabatan', gaji='$gaji', tgl_input=now() where id = '$id'";
    $q1 = mysqli_query($conn, $sql1);
    if ($q1) {
        $hasil = "Data berhasil diupdate";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}

function delete()
{
    global $conn;
    $id = $_GET['id'];
    $sql1 = "delete from pegawai where id = '$id'";
    $q1 = mysqli_query($conn, $sql1);
    if ($q1) {
        $hasil = "Berhasil menghapus data";
    } else {
        $hasil = "Gagal menghapus data";
    }
    $data['data']['result'] = $hasil;
    echo json_encode($data);
}
